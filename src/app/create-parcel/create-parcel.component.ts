import {Component} from "@angular/core";
import {ParcelService} from "../services/parcel.service";
import {CreateParcel} from "../models/create-parcel.model";

@Component({
  selector: 'create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrl: './create-parcel.component.css'
})
export class CreateParcelComponent {
  parcel: CreateParcel = {
    sku: '',
    description: '',
    deliveryDate: '',
    streetAddress: '',
    town: '',
    country: '',
  }

  errorMessages: string[] |undefined = [];

  constructor(private parcelService: ParcelService) {
  }

  onSubmit() {
    const data = {
      sku: this.parcel.sku,
      description: this.parcel.description,
      deliveryDate: this.parcel.deliveryDate,
      streetAddress: this.parcel.streetAddress,
      town: this.parcel.town,
      country: this.parcel.country
    }

    this.parcelService.create(data).subscribe({
      next: () => {
        this.errorMessages = [];
        this.parcel = {
          sku: '',
          description: '',
          deliveryDate: '',
          streetAddress: '',
          town: '',
          country: '',
        }
      },
      error: ({error}) => {
        this.errorMessages = error.message;
      }
    })
  }
}
