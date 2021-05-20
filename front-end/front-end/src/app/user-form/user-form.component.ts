import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  users!:User[];

  constructor(private service: RestapiService, private router: Router) { }

  ngOnInit(): void {
    this.service.getLoggedInUserDetails().subscribe((data: User) => {
      console.log(data.authority);
      if(data.authority.includes("USER")){
        console.log("return");
        this.router.navigate(['/home']);
      }
    },
    (error: HttpErrorResponse) => {
      if(error.status == 401)
        this.router.navigate(['/login']);    
    });
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((data:User[])=>{
      this.users = data;
    })
  }

  deleteUser(userId:Number){
    let foundUser : User;
    foundUser = new User();
    this.users.forEach(user=>{
      if(user.id == userId)
        foundUser = user;
    })
    if(foundUser.authority.includes("ADMIN")){
      window.alert("Cannot delete admin");
      return;
    }
    return this.service.deleteUser(userId).subscribe(()=>this.getUsers());
  }

}
