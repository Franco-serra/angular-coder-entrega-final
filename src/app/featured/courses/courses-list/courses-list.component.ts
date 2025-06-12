import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../shared/interface/Courses';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from '../../../core/store/auth-store/auth.selectors';
import { map } from 'rxjs/operators';
import { TitleService } from '../../../core/services/title.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  standalone: false
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  isAdmin$: Observable<boolean>;
  displayedColumns: string[] = ['name', 'description', 'duration', 'actions'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private store: Store,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnInit(): void {
    this.coursesService.coursesObs.subscribe(courses => {
      this.courses = courses;
    });
    const title = this.route.snapshot.data['title'] || 'Cursos';
    this.titleService.setTitle(title);
  }

  onEdit(course: Course): void {
    this.router.navigate(['courses', course.id, 'edit']);
  }

  onView(course: Course): void {
    this.router.navigate(['courses', course.id, 'view']);
  }

  onDelete(course: Course): void {
    if (course.id) {
      this.coursesService.deleteCourse(course.id);
    }
  }

  onNewCourse(): void {
    this.router.navigate(['courses', 'new']);
  }
} 