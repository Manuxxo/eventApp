import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigateByUrl("/home");
    this.loading = false;
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        window.location.href = '/home'; 
      },
      error => {
        this.errorMessage = 'Usuario o contraseña incorrecto.';
      }
    );
    this.loading = false;
  }

  onRecoverPassword(){
    this.loading = true;
    this.router.navigate(['/recover-password']);
    this.loading = false;
  }
}
