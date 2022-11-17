import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'candidates';

  constructor(
    private auth:AuthService,
    private route:Router
  ){

    let user:any = JSON.parse(localStorage.getItem('user'));
    if(user?.username){
      this.route.navigate(["candidates"]);
    }
    else{
      this.route.navigate(["login"]);
    }
  }
}
