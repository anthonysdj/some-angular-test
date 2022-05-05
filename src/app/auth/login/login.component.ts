import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading$ = new BehaviorSubject<boolean>(false);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  login(): void {
    this.loading$.next(true);

    setTimeout(() => {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.userService
        .getUsers()
        .subscribe(users => {
          const user = users.find(user => {
            return user.email === email
          });
    
          if (!user) {
            console.log('Login failed, user not found.');
            this.loading$.next(false);
            return;
          }

          this.userService.user$.next(user);
    
          if (password === '1234567') {
            localStorage.setItem('authenticated', Date.now().toString());
            this.authService.redirectToDashboard();
            return;
          }
    
          console.log('login failed');
          this.loading$.next(false);
    
          return;
        });
    }, 1000);
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

}
