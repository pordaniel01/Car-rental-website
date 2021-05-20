import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username!:string;
  password!:string;
  email!:string;
  message:any;
  isPasswordInvalid!:boolean;
  isUserInvalid!:boolean;
  isEmailInvalid!:boolean;
  passwordMessage!:string;
  emailMessage!:string;
  userMessage!:string;

  constructor(private service: RestapiService,private router: Router) { }

  ngOnInit(): void {
  }

  validateEmail(email:string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regularExpression.test(String(email).toLowerCase()));
    return regularExpression.test(String(email).toLowerCase());
   }

  register(){
    let user = new User();
    this.isPasswordInvalid = false;
    this.isEmailInvalid = false;
    this.isUserInvalid = false;
    if(!this.validateEmail(this.email) || this.email == null){
      this.isEmailInvalid = true;
      this.emailMessage = "Not valid email format";
      return;
    }
    if(this.password == null || this.password.length < 5){
      this.isPasswordInvalid = true;
      this.passwordMessage = "Password must be longer than 5 chars";
      return;
    }
    if(this.username == null || this.username.length < 5 ){
      this.isUserInvalid = true;
      this.userMessage = "Username must be longer than 5 chars";
      return;
    }
    console.log("gecv");
    user.email = this.email;
    user.password = this.password;
    user.userName = this.username;
    this.service.register(user).subscribe( (data:any) => {
      console.log(data);
      if(data === "user"){
        this.isUserInvalid = true;
        this.userMessage = "Username taken";
      }
      else if(data === "email"){
        this.isEmailInvalid = true;
        this.emailMessage = "Email already registered";
      }
      else
        this.router.navigate(['/login']);
    });
  }

}
