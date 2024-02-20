import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          #filter
          (input)="filterResults(filter.value)"
        />
        <button
          type="button"
          class="primary"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocationBlah of filteredHousingLocationList"
        [housingLocation]="housingLocationBlah"
      />
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  filterResults(text: string): void {
    console.log("filterResults was called");
    if (!text) {
      this.filteredHousingLocationList = this.housingLocationList;
    } else {
      console.log("ELSE");
      this.filteredHousingLocationList = this.housingLocationList.filter(
        (housingLocation) =>
          housingLocation?.city.toLowerCase().includes(text.toLowerCase()) ||
          housingLocation?.state.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredHousingLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredHousingLocationList = housingLocationList;
      });
  }
}
