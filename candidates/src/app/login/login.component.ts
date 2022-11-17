import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  curentUser: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    // let user:any = JSON.parse(localStorage.getItem('user'));
    // if(user?.username){
    //   this.route.navigate(["candidates"]);
    // }
    // else{
    //   this.route.navigate(["login"]);
    // }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    let user: any = this.authService.users.filter(
      (a) => a.username === username
    );

    console.log(this.form);
    
    console.log(user[0]);
    

    if (username != user[0]?.username || password != user[0]?.password) {
      alert('invalid Credentials');
      return;
    }

    if (user[0]?.username) {
      localStorage.setItem('user', JSON.stringify(user[0]));
      this.route.navigate(["candidates"]);
    }

    // this.authService.login(username, password).subscribe({
    //   next: data => {
    //     this.storageService.saveUser(data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.storageService.getUser().roles;
    //     this.reloadPage();
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
