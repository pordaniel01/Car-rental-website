import { Car } from "./car";
import { User } from "./user";

export class Rent {
    id!:number;
    rentTime!:Date;
    car!:Car;
    user!:User;
}
