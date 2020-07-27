import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  state: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUserSubject.subscribe((state) => {
      this.state = state;
      if (state) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
