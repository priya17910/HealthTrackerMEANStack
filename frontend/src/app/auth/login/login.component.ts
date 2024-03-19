// app/auth/login/login.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  credentials: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem("token", token);
        this.authService.setAuthenticationStatus(true);
        this.router.navigate(['/activities']);
      },
      error => {
        console.error('Error logging in:', error);
      }
    );
  }
}
