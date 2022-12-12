import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  verticalPosition: MatSnackBarVerticalPosition = "top";
  user ={
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    address: ""
  }
  constructor(private authService: AuthService, 
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

 
  onSubmit() {
    this.authService.signUp(this.user)
      .subscribe(res => {
        if (res.success) {
          this.openSnackBar(res.status);
          this.router.navigate(['/login']);
        } else {
          console.log(res);
        }
      });
  }

  openSnackBar(res: string) {
    this._snackBar.open(res,"undo", {
      duration: 3000,
      verticalPosition: this.verticalPosition,
      panelClass: ["snackbar"]
    });
  }
}
