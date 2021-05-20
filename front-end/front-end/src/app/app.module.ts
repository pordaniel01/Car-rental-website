import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestapiService } from './restapi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { CarFormComponent } from './car-form/car-form.component';
import { RouterModule } from '@angular/router';
import { NewCarFormComponent } from './new-car-form/new-car-form.component';
import { RentComponent } from './rent/rent.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EditCarComponent } from './edit-car/edit-car.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CarFormComponent,
    NewCarFormComponent,
    RentComponent,
    UserFormComponent,
    EditCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'cars/:carId', component: CarFormComponent },
      { path: 'editcar/:carId', component: EditCarComponent },
      { path: 'newcar', component: NewCarFormComponent },
      { path: 'users', component: UserFormComponent },
      { path: 'rent', component: RentComponent }
    ])
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }


