import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../../shared/interface/Students';
import { StudentsService } from '../../../../core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { TitleService } from '../../../../core/services/title.service';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.css'
})
export class StudentsFormComponent implements OnInit {
  formGroup: FormGroup;
  isEditMode = false;
  isViewMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder, 
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService
  ) {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1]?.path;
      this.isViewMode = lastSegment === 'view';
      this.isEditMode = lastSegment === 'edit';
      
      let title = 'Estudiantes';
      if (this.isEditMode) title = 'Editar Estudiante';
      if (this.isViewMode) title = 'Ver Estudiante';
      this.titleService.setTitle(title);
      
      if (this.isViewMode || this.isEditMode) {
        this.route.params.pipe(
          map(params => params['id']),
          switchMap(id => this.studentsService.studentsObs.pipe(
            map(students => students.find(s => s.id === +id))
          ))
        ).subscribe(student => {
          if (student) {
            this.studentId = student.id;
            this.formGroup.patchValue(student);
            if (this.isViewMode) {
              this.formGroup.disable();
            }
          } else {
            this.router.navigate(['/students']);
          }
        });
      }
    });
  }

  submit(): void {
    if (this.formGroup.valid) {
      const student: Student = {
        ...this.formGroup.value,
        id: this.studentId
      };

      if (this.isEditMode && this.studentId) {
        this.studentsService.updateStudent(student);
      } else {
        this.studentsService.addStudentsObs([student]);
      }
      
      this.formGroup.reset();
      this.router.navigate(['/students']);
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}

