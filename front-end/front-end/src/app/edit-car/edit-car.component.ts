import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  id!:number;
  message!:string;
  carName!:string;
  carColor!:string;
  imageUrl!:string;

  constructor(private service: RestapiService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('carId'));
    this.getCar();
  }

  editCar(){
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
    console.log(this.carName);
    car.name = this.carName;
    console.log(car.name);
    car.color = this.carColor;
    car.imageUrl = this.imageUrl;
    this.service.editCar(car,this.id).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  getCar(){
    this.service.getCarById(this.id).subscribe((data: Car) => {
      this.carName = data.name;
      this.carColor = data.color;
      this.imageUrl = data.imageUrl;
    });
  }

}
