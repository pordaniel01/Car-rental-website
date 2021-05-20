import { HttpClient, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from './auth-request';
import { Car } from './car';
import { User } from './user';
import { RequestOptions, Headers } from '@angular/http';
import { Rent } from './rent';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  

  constructor(private http:HttpClient, private xhrHttp:HttpXhrBackend) { }

  public login( auth:AuthRequest){
    return this.http.post("http://localhost:8080/api/auth",auth,{   withCredentials:true });
  }
  public register(user:User){

    return this.http.post("http://localhost:8080/api/register",user,{   withCredentials:true, responseType:'text' });
  }
  public editCar(car:Car, id:Number){
    let url = "http://localhost:8080/api/car-rental/cars/" + id;
    return this.http.put(url,car,{   withCredentials:true });
  }
  public logout(){
    return this.http.get("http://localhost:8080/api/logout",{ withCredentials:true });
  }
  public getCars(){
    return this.http.get<Car[]>("http://localhost:8080/api/car-rental/cars/",{   withCredentials:true });
  }
  public getLoggedInUserDetails(){
    return this.http.get<User>("http://localhost:8080/api/user",{   withCredentials:true });
  }
  public getCarById(id:number){
    let url = 'http://localhost:8080/api/car-rental/cars/' + id;
    return this.http.get<Car>(url,{   withCredentials:true });
  }
  public deleteCar(id:Number){
    let url = 'http://localhost:8080/api/car-rental/cars/' + id;
    return this.http.delete(url,{   withCredentials:true });
  }
  public rent(id:Number) {
    let url = "http://localhost:8080/api/car-rental/cars/" + id;
    console.log('ge');
    return this.http.post(url, null, {   withCredentials:true });
  }
  public getRent(){
    return this.http.get<Rent[]>("http://localhost:8080/api/car-rental/rents", {   withCredentials:true });
  }
  public createNewCar(car:Car){
    return this.http.post("http://localhost:8080/api/car-rental/cars/",car, {   withCredentials:true });
  }
  public deleteRent(id:Number){
    let url = "http://localhost:8080/api/car-rental/rents/" + id;
    return this.http.delete(url,{ withCredentials:true });
  }
  public isCarRented(id:Number){
    let url = "http://localhost:8080/api/car-rental/isrented/" + id;
    return this.http.get(url,{ withCredentials:true , responseType: 'text' });
  }
  public getUserInfo(){
    return this.http.get<User>('http://localhost:8080/api/user',{ withCredentials:true }); 
  }
  public getUsers(){
    return this.http.get<User[]>("http://localhost:8080/api/users",{ withCredentials:true });
  }
  public updateUser(user:User){
    return this.http.put<User>("http://localhost:8080/api/user", user,{ withCredentials:true });
  }
  public deleteUser(id:Number){
    let url = "http://localhost:8080/api/user/" + id;
    return this.http.delete<User>(url, {withCredentials:true});
  }
}
