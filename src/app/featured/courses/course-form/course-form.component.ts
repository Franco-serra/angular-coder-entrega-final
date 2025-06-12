import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../shared/interface/Courses';
import { TitleService } from '../../../core/services/title.service';
import { switchMap, tap, of } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  standalone: false
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId?: string;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    public router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          this.isEditMode = true;
          this.courseId = id;
          return this.coursesService.getCourseById(id);
        }
        return of(null);
      }),
      tap(course => {
        if (course) {
          this.courseForm.patchValue(course);
        }
      })
    ).subscribe();

    const title = this.route.snapshot.data['title'] || (this.isEditMode ? 'Editar Curso' : 'Nuevo Curso');
    this.titleService.setTitle(title);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData: Omit<Course, 'id'> = this.courseForm.value;

      if (this.isEditMode && this.courseId) {
        this.coursesService.updateCourse(this.courseId, { ...courseData, id: parseInt(this.courseId) })
          .subscribe(() => this.router.navigate(['/courses']));
      } else {
        this.coursesService.createCourse(courseData)
          .subscribe(() => this.router.navigate(['/courses']));
      }
    }
  }
} 