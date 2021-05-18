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
  

  constructor(private service: RestapiService,private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    let user = new User();
    user.email = this.email;
    user.password = this.password;
    user.userName = this.username;
    console.log(user.email, user.userName);
    let response = this.service.register(user);
    response.subscribe( data=>{
      console.log(data);
      this.router.navigate(['/login']);
    })
  }

}
