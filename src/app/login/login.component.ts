import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }
  ngOnDestroy() {
  }
  onSubmit() {
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          
          window.location.replace("https://cypherstore.netlify.app/home");
          
        } else {
          console.log(res);
        }
      });
  }
}
