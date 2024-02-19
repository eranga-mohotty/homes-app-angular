import { Component ,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form action="">
        <input type="text" name="" id="" placeholder="Filter by city">
        <button class="primary">Search</button>
      </form>
    </section>
    <section class="results">
    <app-housing-location *ngFor="let housingLocationBlah of housingLocationList" [housingLocation]="housingLocationBlah" />
    
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList:HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  
  constructor(){
    this.housingLocationList=this.housingService.getAllHousingLocations();
  }


}
