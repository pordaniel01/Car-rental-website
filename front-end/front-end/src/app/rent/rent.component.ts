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
    this.getRentedCars();
    this.getUserData();
  }
  
  getRentedCars(){
    this.service.getRent().subscribe((data: Rent[]) => {
      this.rents = data;
      this.rents.forEach((rent)=>console.log("asd" + rent.rentTime));
    })
  }

  getUserData(){
    this.service.getLoggedInUserDetails().subscribe((data: User) => {
      this.user = data;
      if(this.user.authority.includes('USER'))
      this.isUser = true;
      if(this.user.authority.includes('ADMIN'))
      this.isAdmin = true;   
    });
    
  }

}
