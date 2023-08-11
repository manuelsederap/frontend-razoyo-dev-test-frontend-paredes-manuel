import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  carsList: any;
  allMakes!: string[];
  selectedCar!: string;
  token!: string;
  carMakeAndMode! :string;
  carImage!:string;
  carMake! :string;
  carModel! :string;
  carMpg! :number;
  carPrice! :number;
  carSeats! :number;
  carYear! :number;
  isCollapsed! :boolean;
  activeAccordionId? :string;


  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.selectedCar = "";
    this.isCollapsed = true;
    this.http.get<Cars>(environment.baseUrl + '/cars')
    .subscribe(result => {
      this.carsList = result.cars;
      this.allMakes = result.all_makes;
    },
    error => console.error(error))
  }

  onCarSelection() {
    if (this.selectedCar == "")  {
      this.http.get<Cars>(environment.baseUrl + '/cars')
      .subscribe(result => {
        this.carsList = result.cars;
        this.allMakes = result.all_makes;
      },
      error => console.error(error))        
    } else {
      this.http.get<Cars>(environment.baseUrl + `/cars?make=${this.selectedCar}`)
      .subscribe(result => {
        this.carsList = result.cars;
        this.allMakes = result.all_makes;
      },
      error => console.error(error))
    }
  }

  fetchCarDetails(carId: string) {
    this.activeAccordionId === carId ?
      this.activeAccordionId = "invalidid" :
      this.activeAccordionId = carId;

    this.http.get<CarInfo>(environment.baseUrl + `/cars/${carId}`)
    .subscribe(result => {
      this.carImage = result.image;
      this.carMake = result.make;
      this.carModel = result.model;
      this.carMpg = result.mpg;
      this.carSeats = result.seats;
      this.carYear = result.year;
      this.carPrice = result.price;
    },
    error => console.error(error))
  }  
}

interface Cars {
  cars: Car[],
  all_makes: string[]
  token: string;
}

interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
}

interface CarInfo {
  id: string;
  image: string;
  make: string;
  model: string;
  mpg: number;
  price: number;
  seats: 5;
  year: 2019;
}