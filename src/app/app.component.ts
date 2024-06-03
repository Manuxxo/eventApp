import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'eventApp';
  isLogged: boolean = false;
  isLoggin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    await this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggin = !['/login', '/recover-password'].includes(event.url);
      }
    });
    this.isLogged = await this.authService.isAuthenticated();
    console.log(this.isLogged)
  }
}
