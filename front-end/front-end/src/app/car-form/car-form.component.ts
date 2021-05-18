import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  id!:number;
  car!:Car;

  constructor(private route: ActivatedRoute,private service: RestapiService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('carId'));
    this.getCar();
  }
  getCar(){
    this.service.getCarById(this.id).subscribe((data: Car) => this.car = data);
  }
  rent(id:Number){
    if(confirm("Are you sure you want to rent this vehicle?")){
      this.service.rent(id).subscribe(() => {
      }
      );
    }
  }

}
