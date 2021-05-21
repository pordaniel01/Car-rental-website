import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user!:User;
  userName!:string;
  email!:string;
  password!:string;
  modifyState!:boolean;
  userMessage!:string;
  emailMessage!:string;

  constructor(private service: RestapiService, private router: Router) { this.modifyState = false; }

  ngOnInit(): void {
    this.service.getUserInfo().subscribe((data:User)=>{
      this.user = data;
      console.log(this.user.userName);
    })
  }

  modify(){
    this.modifyState = true;
  }

  validateEmail(email:string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regularExpression.test(String(email).toLowerCase()));
    return regularExpression.test(String(email).toLowerCase());
   }

  submit(){
    let user = new User();
    this.userMessage = "";
    this.emailMessage = "";
    console.log("asd");
    if( this.password == null || this.password.length < 5   ){
      window.alert("Password must be longer than 5")
      return;
    }
    if(this.userName == null || this.userName.length < 5  ){
      window.alert("Username must be longer than 5");
      return;
    }
    if( this.email == null || !this.validateEmail(this.email ) ){
      window.alert("Wrong email format");
      return;
    }
    user.id = this.user.id;
    console.log(user.id);
    user.email = this.email;
    user.password = this.password;
    user.userName = this.userName;
    this.service.updateUser(user).subscribe( (data:any) => {
      console.log(data);
      if(data === "user"){
        this.userMessage = "Username taken";
      }
      else if(data === "email"){
        this.emailMessage = "Email already registered";
      }
      else
        this.router.navigate(['/login']);
    });
  }
}
