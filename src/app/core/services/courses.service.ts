import { Injectable } from '@angular/core';
import { Course } from '../../shared/interface/Courses';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _courses: Course[] = [
    { id: 1, name: 'Angular', description: 'Curso de Angular', duration: '3 meses' },
    { id: 2, name: 'Vue', description: 'Curso de Vue', duration: '2 meses' },
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this._courses);
  courses$ = this.coursesSubject.asObservable();

  coursesCount$ = this.courses$.pipe(
    map(courses => courses.length)
  );

  get courses(): Course[] {
    return [...this._courses];
  }

  get coursesObs() {
    return this.coursesSubject.asObservable();
  }

  addCourse(course: Course): void {
    const existingIds = this._courses.map(c => c.id || 0);
    const newId = Math.max(...existingIds, 0) + 1;
    const newCourse = { ...course, id: newId };
    this._courses = [...this._courses, newCourse];
    this.coursesSubject.next(this._courses);
  }

  updateCourse(updatedCourse: Course): void {
    this._courses = this._courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    );
    this.coursesSubject.next(this._courses);
  }

  deleteCourse(courseId: number): void {
    this._courses = this._courses.filter(course => course.id !== courseId);
    this.coursesSubject.next(this._courses);
  }

  getCourseById(id: number): Course | undefined {
    return this._courses.find(course => course.id === id);
  }

  constructor() {}
} 