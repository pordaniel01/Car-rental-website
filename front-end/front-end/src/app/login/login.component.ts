import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from '../auth-request';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!:string;
  message:any;

  constructor(private service: RestapiService, private router: Router ) { }

  ngOnInit(): void {
  }

  login(){
    let auth = new AuthRequest();
    auth.username = this.username;
    auth.password = this.password;
    let response = this.service.login(auth);
    response.subscribe( data=>{
      console.log(data);
      this.router.navigate(['/home']);
    })
  }

  register(){
    this.router.navigate(['/register']);
  }

}
