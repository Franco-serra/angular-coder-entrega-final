import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosModule } from './students/alumnos.module';
import { FormReactiveComponent } from './pages/form-reactive/form-reactive.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    FormReactiveComponent,
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    AlumnosModule,
    SharedModule,
  ]
})
export class FeaturedModule { }
