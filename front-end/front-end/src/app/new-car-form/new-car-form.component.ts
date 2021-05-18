import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-new-car-form',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.css']
})
export class NewCarFormComponent implements OnInit {

  carName!:string;
  carColor!:string;
  imageUrl!:string;

  constructor(private service: RestapiService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewCar(){
    let car = new Car();
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
