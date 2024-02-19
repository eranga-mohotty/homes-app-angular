import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img [src]="housingLocation?.photo" alt="" class="listing-photo">
      <section class="listing-description">
        <h2 class="listing-heading">
          {{housingLocation?.name}}
        </h2>
        <p class="listing-location">
          {{housingLocation?.city}}, {{housingLocation?.state}}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">
          About this location
        </h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi?"Yes":"No"}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry?"Yes":"No"}}</li>
        </ul>
      </section>
      <section class="listing-supply">
        <h2 class="section-heading"> Apply to live here now</h2>
        <button class="primary listing-button"> Apply now</button>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined
  constructor(){
    const housingLocationId = Number(this.route.snapshot.params["id"])
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

}
