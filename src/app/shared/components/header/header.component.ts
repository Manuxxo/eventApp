import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isLogged: boolean = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }
  
  async logout(){
    this.loading = true;
    await this.authService.logout();
    window.location.href = '/login'; 
    this.loading = false;
  }
}
