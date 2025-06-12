import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../shared/interface/Students';
import { StudentsService } from '../../../../core/services/students.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../../../../core/store/auth-store/auth.selectors';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from '../../../../core/services/title.service';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})

export class StudentsListComponent implements OnInit {

  dataSource!: Observable<Student[]>;
  isAdmin$: Observable<boolean>;
  displayedColumns: string[] = ['fullName', 'lastName', 'email', 'course'];

  constructor(
    private studentsService: StudentsService, 
    private store: Store,
    private router: Router,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    
    // Add actions column for admins
    this.isAdmin$.pipe(
      map(isAdmin => isAdmin ? [...this.displayedColumns, 'actions'] : this.displayedColumns)
    ).subscribe(columns => {
      this.displayedColumns = columns;
    });
  }

  ngOnInit(): void {
    this.dataSource = this.studentsService.studentsObs;
    const title = this.route.snapshot.data['title'] || 'Estudiantes';
    this.titleService.setTitle(title);
  }

  addStudents(newStudents: Student[]): void {
    this.studentsService.addStudentsObs(newStudents);
  }

  onView(id: number): void {
    this.router.navigate(['/students', id, 'view']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.studentsService.deleteStudent(id);
    }
  }
}
