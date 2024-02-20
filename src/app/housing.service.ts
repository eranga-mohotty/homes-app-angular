import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName,lastName,email);
  }
  url = 'http://localhost:3000/locations';

  // protected housingLocationList : HousingLocation[] = [];


  constructor() { }

  async getAllHousingLocations(): Promise <HousingLocation[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: Number): Promise <HousingLocation | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json()??{};

  }


}
