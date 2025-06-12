import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as AuthActions from '../../../core/store/auth-store/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../core/store/auth-store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage: string = '';
  private errorSub?: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    this.isLoading$ = this.store.select(selectAuthLoading);
  }

  ngOnInit() {
    this.errorSub = this.store.select(selectAuthError).subscribe(error => {
      if (error) {
        this.errorMessage = error.message || 'Error en el inicio de sesión';
      } else {
        this.errorMessage = '';
      }
    });
  }

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente';
    }
  }
} 