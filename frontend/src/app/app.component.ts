import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'GeeksForGeeks Health Tracker';
  isLoggedIn: any;
  componentReload: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('token'))
        {
          this.isLoggedIn = true;
        }
        else
        {
          this.ifLoggedIn();
        }
        this.componentReload = true;
  }

  // loginClicked(): void {
  //   this.loginEvent.emit();
  // }

  // registerClicked(): void {
  //   this.registerEvent.emit();
  // }

  ifLoggedIn():void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }
  logout(): void {
    this.authService.setAuthenticationStatus(false);
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }
}
