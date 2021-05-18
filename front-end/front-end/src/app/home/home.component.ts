import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Car } from '../car';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars!:Car[];
  user!:User;
  isAdmin!:boolean;
  isUser!:boolean;

  constructor(private service: RestapiService, private router: Router) { }

  ngOnInit(): void {
    this.getCars();
    this.getUserData();
    
  }

  getCars(){
    this.service.getCars().subscribe((data: Car[]) => this.cars = data);
    const reloadInterval = 10;
    setInterval(()=> { this.service.getCars().subscribe((data: Car[]) => this.cars = data) }, reloadInterval * 1000);
   
            
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

  rent(id:Number){
    this.service.rent(id).subscribe(()=> console.log("rentt"));
  }

  delete(carid:Number){
    this.service.getCars().subscribe((data: Car[]) => {
      this.cars = data;
      if(confirm("Are you sure you want to delete this car?")) {
        this.service.deleteCar(carid).subscribe();
      }
      this.service.getCars().subscribe((data: Car[]) => this.cars = data);
    });
    
  }

}
