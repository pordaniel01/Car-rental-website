import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { RestapiService } from '../restapi.service';
import { User } from '../user';

@Component({
  selector: 'app-new-car-form',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.css']
})
export class NewCarFormComponent implements OnInit {

  carName!:string;
  carColor!:string;
  imageUrl!:string;
  message!:string;

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
    })
  }

  createNewCar(){
    let car = new Car();
    if(this.carName == null || this.carName.length < 5){
      this.message = "Car name too short";
      return;
    }
    if(this.carColor == null ){
      this.message = "Car color mustnt be 0 lenght";
      return;
    }
    if(this.imageUrl == null || this.imageUrl.length < 5){
      this.message = "No URL given";
      return;
    }
    car.name = this.carName;
    car.color = this.carColor;
    car.imageUrl = this.imageUrl;
    this.service.createNewCar(car).subscribe(() => {
      console.log("new car ");
      this.router.navigate(['/home']);
    }
    
    );
  }

}
