import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockResponse = { token: 'fake-token', user: { id: 1, email: 'test@test.com' } };
    const email = 'test@test.com';
    const password = 'password123';

    service.login(email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.isAuthenticated()).toBeTruthy();
      expect(service.getToken()).toBe('fake-token');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout successfully', () => {
    localStorage.setItem('currentUser', JSON.stringify({ token: 'fake-token' }));
    service.logout();
    expect(service.isAuthenticated()).toBeFalsy();
    expect(service.getToken()).toBeNull();
  });

  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
}); 