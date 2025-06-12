import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../shared/interface/Students';
import { StudentsService } from '../../../../core/services/students.service';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../../../../core/store/auth-store/auth.selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from '../../../../core/services/title.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../shared/interface/Courses';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})

export class StudentsListComponent implements OnInit {

  students$: Observable<Student[]>;
  isAdmin$: Observable<boolean>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'status', 'courses', 'actions'];

  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private router: Router,
    private store: Store,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.students$ = this.studentsService.getStudents().pipe(
      switchMap(students => {
        return this.coursesService.getCourses().pipe(
          map(courses => {
            return students.map(student => ({
              ...student,
              courseNames: (student.courses || [])
                .map(courseId => courses.find(c => c.id?.toString() === courseId)?.name)
                .filter(name => name)
                .join(', ')
            }));
          })
        );
      })
    );
  }

  ngOnInit(): void {
    const title = this.route.snapshot.data['title'] || 'Estudiantes';
    this.titleService.setTitle(title);
  }

  onEdit(student: Student): void {
    this.router.navigate(['students', student.id, 'edit']);
  }

  onView(student: Student): void {
    this.router.navigate(['students', student.id, 'view']);
  }

  onDelete(student: Student): void {
    if (student.id) {
      this.studentsService.deleteStudent(student.id)
        .subscribe(() => {
          // Actualizar la lista después de eliminar
          this.students$ = this.studentsService.getStudents().pipe(
            switchMap(students => {
              return this.coursesService.getCourses().pipe(
                map(courses => {
                  return students.map(student => ({
                    ...student,
                    courseNames: (student.courses || [])
                      .map(courseId => courses.find(c => c.id?.toString() === courseId)?.name)
                      .filter(name => name)
                      .join(', ')
                  }));
                })
              );
            })
          );
        });
    }
  }

  onNewStudent(): void {
    this.router.navigate(['students', 'new']);
  }
}
