import {RouterModule, Routes} from '@angular/router';
import {CreateParcelComponent} from "./create-parcel/create-parcel.component";
import {NgModule} from "@angular/core";
import {ParcelsComponent} from "./parcels/parcels.component";

const routes: Routes = [
  { path: '', redirectTo: 'parcels', pathMatch: 'full' },
  { path: 'parcels', component: ParcelsComponent },
  { path: 'create', component: CreateParcelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
