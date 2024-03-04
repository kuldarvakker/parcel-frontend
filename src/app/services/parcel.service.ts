import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SortDirection} from "@angular/material/sort";
import {CreateParcel} from "../models/create-parcel.model";
import {Parcel} from "../models/parcel.model";

const baseUrl = 'http://localhost:3000/api/v1/parcels';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  constructor(private http: HttpClient) {}

  getAll(sort: string, order: SortDirection, country: string, description: string): Observable<Parcel[]> {
    let requestUrl = `${baseUrl}?sortBy=${sort}&sortDirection=${order.toUpperCase()}`;

    if (country !== '') {
      requestUrl = `${requestUrl}&country=${country}`;
    }
    if (description !== '') {
      requestUrl = `${requestUrl}&description=${description}`;
    }

    return this.http.get<Parcel[]>(requestUrl);
  }

  create(data: CreateParcel): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
