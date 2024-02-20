import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
        <form [formGroup]="applyForm" (submit)="submitApplication()">

          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName">
          
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">

          <button class="primary listing-button" type="submit"> Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(){
    const housingLocationId = Number(this.route.snapshot.params["id"])
    this.housingService.getHousingLocationById(housingLocationId).then(
      (housingLocation)=>{
        this.housingLocation = housingLocation;

      }

    );
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );

  }

}
