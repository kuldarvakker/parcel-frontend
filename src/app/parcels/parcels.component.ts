import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {Parcel} from "../models/parcel.model";
import {ParcelService} from "../services/parcel.service";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {debounceTime, merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'parcels',
  templateUrl: './parcels.component.html',
  styleUrl: 'parcels.component.css'
})
export class ParcelsComponent implements AfterViewInit {
  displayedColumns: string[] = ['sku', 'description', 'streetAddress', 'town', 'country', 'deliveryDate'];
  data: Parcel[] = [];
  isLoadingResults = true;

  @ViewChild(MatSort) sort: MatSort;
  countryFilter = new FormControl('');
  descriptionFilter = new FormControl('');
  constructor(private parcelService: ParcelService) {}

  ngAfterViewInit(): void {
    merge(
      this.sort.sortChange,
      this.countryFilter.valueChanges.pipe(debounceTime(500)),
      this.descriptionFilter.valueChanges.pipe(debounceTime(500)),
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.parcelService.getAll(
            this.sort.active,
            this.sort.direction,
            this.countryFilter.value ?? '',
            this.descriptionFilter.value ?? ''
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          return data;
        }),
      )
      .subscribe(data => (this.data = data));
    }

}
