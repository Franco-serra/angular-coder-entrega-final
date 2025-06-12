import { Injectable } from '@angular/core';
import { Course } from '../../shared/interface/Courses';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private apiService: ApiService) {}

  getCourses(): Observable<Course[]> {
    return this.apiService.getData<Course[]>('courses');
  }

  getCourseById(id: string): Observable<Course> {
    return this.apiService.getData<Course>(`courses/${id}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.apiService.createData<Course>('courses', course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.apiService.updateData<Course>('courses', id, course);
  }

  deleteCourse(id: string): Observable<Course> {
    return this.apiService.deleteData<Course>('courses', id);
  }
} 