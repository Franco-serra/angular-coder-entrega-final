import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../../../../shared/interface/Students';
import { TitleService } from '../../../../core/services/title.service';
import { switchMap, map, of } from 'rxjs';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../shared/interface/Courses';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.css'
})
export class StudentsFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId?: string;
  courses$: Observable<Course[]>;

  constructor(
    private fb: FormBuilder, 
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {
    this.courses$ = this.coursesService.getCourses();
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      status: ['active', Validators.required],
      courses: [[], Validators.required]
    });
  }

  ngOnInit(): void {
        this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          this.isEditMode = true;
          this.studentId = id;
          return this.studentsService.getStudentById(id);
        }
        return of(null);
      })
        ).subscribe(student => {
          if (student) {
        this.studentForm.patchValue(student);
      }
    });

    const title = this.route.snapshot.data['title'] || (this.isEditMode ? 'Editar Estudiante' : 'Nuevo Estudiante');
    this.titleService.setTitle(title);
          }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData: Omit<Student, 'id'> = this.studentForm.value;

      if (this.isEditMode && this.studentId) {
        this.studentsService.updateStudent(this.studentId, { ...studentData, id: this.studentId })
          .subscribe(() => this.router.navigate(['/students']));
      } else {
        this.studentsService.createStudents([studentData])
          .subscribe(() => this.router.navigate(['/students']));
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}

