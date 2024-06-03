import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoaderComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements OnInit{
  email: string = '';
  message: string = '';
  success: boolean = false;
  loading: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.recoverPassword(this.email).subscribe(
      response => {
        this.message = 'Correo de recuperación enviado';
        this.success = true;
      },
      err => {
        this.message = 'Error al enviar el correo. Comprueba si el email existe.';
        this.success = false;
      }
    );
    this.loading = false;
  }

  goToLogin(){
    this.loading = true;
    this.router.navigateByUrl("login");
    this.loading = false;
  }
}
