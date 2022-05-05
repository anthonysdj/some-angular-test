import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './users/user';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cambridge';
  user: User;

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
