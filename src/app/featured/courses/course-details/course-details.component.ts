import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../shared/interface/Courses';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleService } from '../../../core/services/title.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CourseDetailsComponent implements OnInit {
  course$!: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.course$ = this.route.params.pipe(
      switchMap(params => {
        const courseId = params['id'];
        return this.coursesService.getCourseById(courseId);
      })
    );

    this.course$.subscribe(course => {
      this.titleService.setTitle(`Detalles del Curso: ${course.name}`);
    });
  }

  onBack(): void {
    this.router.navigate(['/courses']);
  }
} 