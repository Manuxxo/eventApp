import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  isLogged = false;
  loading = true;

  constructor(private authService: AuthService, private router: Router){}

  async ngOnInit() {
    this.isLogged = await this.authService.isAuthenticated();
    this.loading = false;
  }

  goToEvent(){
    this.loading = true;
    this.router.navigate(['/event/event-list']);
    this.loading = false;
  }

  goToHome(){
    this.loading = true;
    this.router.navigate(['/home']);
    this.loading = false;
  }
}
