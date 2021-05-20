import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  id!:number;
  car!:Car;
  isRented!:boolean;

  constructor(private route: ActivatedRoute,private service: RestapiService, private router: Router ) { }

  ngOnInit(): void {
    this.getUserData();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('carId'));
    this.getCar();
    this.isCarRented(this.id);
  }
  getCar(){
    this.service.getCarById(this.id).subscribe((data: Car) => {
      this.car = data;
    });
  }
  rent(id:Number){
    if(confirm("Are you sure you want to rent this vehicle?")){
      this.service.rent(id).subscribe(() => {
        this.router.navigate(['/home']);
      }
      );
      
    }
  }
  isCarRented(id:Number){
    this.service.isCarRented(id).subscribe((data:String) => {
      if(data === "true")
        this.isRented = true;
      else 
        this.isRented = false;
      console.log(this.isRented);
    }
  );
  }
  getUserData(){
    this.service.getLoggedInUserDetails().subscribe((data: User) => {
    },
    (error: HttpErrorResponse) => {
      if(error.status == 401)
        this.router.navigate(['/login']);    
    });
    
  }


}
