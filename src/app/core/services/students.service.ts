import { Injectable } from '@angular/core';
import { Student } from '../../shared/interface/Students'; 
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 

export class StudentsService {
  private _students: Student[] = [
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan@gmail.com', course: 'angular' },
    { id: 2, firstName: 'Ana', lastName: 'López', email: 'ana@hotmail.com', course: 'vue' },
  ];  

  private studentsSubject = new BehaviorSubject<Student[]>(this._students);
  students$ = this.studentsSubject.asObservable();

  studentsAngular$ = this.students$.pipe(
    map(students => students.filter(student => student.course.toLowerCase() === 'angular'))
  );

  studentsAngularCount$ = this.studentsAngular$.pipe(
    map(students => students.length)
  );

  studentsCount$ = this.students$.pipe(        
    map(students => students.length)
  );

  get students(): Student[] {
    return [...this._students];
  }

  get studentsObs() {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student): void {
    const existingIds = this._students.map(s => s.id || 0);
    const newId = Math.max(...existingIds, 0) + 1;
    const newStudent = { ...student, id: newId };
    this._students = [...this._students, newStudent];
    this.studentsSubject.next(this._students);
  }

  addStudentsObs(students: Student[]): void {
    const existingIds = this._students.map(s => s.id || 0);
    const maxId = Math.max(...existingIds, 0);
    const newStudents = students.map((student, index) => ({
      ...student,
      id: maxId + index + 1
    }));
    this._students = [...this._students, ...newStudents];
    this.studentsSubject.next(this._students);
  }

  updateStudent(updatedStudent: Student): void {
    this._students = this._students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
    this.studentsSubject.next(this._students);
  }

  deleteStudent(studentId: number): void {
    this._students = this._students.filter(student => student.id !== studentId);
    this.studentsSubject.next(this._students);
  }

  getStudentById(id: number): Student | undefined {
    return this._students.find(student => student.id === id);
  }

  constructor() {}
}