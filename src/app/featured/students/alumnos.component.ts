import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../core/services/students.service';
import { Student } from '../../shared/interface/Students';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from '../../core/store/auth-store/auth.selectors';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {
  students$: Observable<Student[]>;
  isAdmin$: Observable<boolean>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'status', 'actions'];

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private store: Store,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.students$ = this.studentsService.getStudents();
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
          this.students$ = this.studentsService.getStudents();
        });
    }
  }

  onNewStudent(): void {
    this.router.navigate(['students', 'new']);
  }
}
