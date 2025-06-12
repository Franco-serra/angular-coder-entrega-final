import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Student } from '../../shared/interface/Students'; 
import { environment } from '../../../environments/environment';
import { map, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class StudentsService {
  private apiUrl = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  createStudents(students: Omit<Student, 'id'>[]): Observable<Student[]> {
    const createRequests = students.map(student => this.createStudent(student));
    return forkJoin(createRequests);
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener los cursos de un estudiante
  getStudentCourses(studentId: string): Observable<string[]> {
    return this.http.get<Student>(`${this.apiUrl}/${studentId}`).pipe(
      map(student => student.courses)
    );
  }

  // Método para agregar un curso a un estudiante
  addCourseToStudent(studentId: string, courseId: string): Observable<Student> {
    return this.getStudentById(studentId).pipe(
      switchMap(student => {
        if (!student.courses.includes(courseId)) {
          const updatedStudent = {
            ...student,
            courses: [...student.courses, courseId]
          };
          return this.updateStudent(studentId, updatedStudent);
        }
        return of(student);
      })
    );
  }

  // Método para remover un curso de un estudiante
  removeCourseFromStudent(studentId: string, courseId: string): Observable<Student> {
    return this.getStudentById(studentId).pipe(
      switchMap(student => {
        const updatedStudent = {
          ...student,
          courses: student.courses.filter(id => id !== courseId)
        };
        return this.updateStudent(studentId, updatedStudent);
      })
    );
  }
}