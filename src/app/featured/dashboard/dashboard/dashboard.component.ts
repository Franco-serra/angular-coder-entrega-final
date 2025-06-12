import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../core/services/title.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: TitleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const title = this.route.snapshot.data['title'] || 'Dashboard';
    this.titleService.setTitle(title);
  }
}
