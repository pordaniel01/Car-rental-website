import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { Rent } from '../rent';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  rents!:Rent[];
  cars!:Car[];
  user!:User;
  isAdmin!:boolean;
  isUser!:boolean;

  constructor(private service: RestapiService, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();

    this.getRentedCars();
  }
  
  getRentedCars(){
    this.service.getRent().subscribe((data: Rent[]) => {
      this.rents = data;
    });
    this.getUserData();
    setInterval(()=>{this.service.getRent().subscribe((data: Rent[]) => {
      this.rents = data;
      this.getUserData();

    })}, 5 * 1000);
  }

  getUserData(){
    this.service.getLoggedInUserDetails().subscribe((data: User) => {
      this.user = data;
      if(this.user.authority.includes('USER'))
      this.isUser = true;
      if(this.user.authority.includes('ADMIN'))
      this.isAdmin = true;   
    },
    (error: HttpErrorResponse) => {
      if(error.status == 401)
        this.router.navigate(['/login']);    
    });
    
  }
  deleteRent(id:Number){
    this.service.deleteRent(id).subscribe(()=>
      this.getRentedCars()
    );
    
  }

}
