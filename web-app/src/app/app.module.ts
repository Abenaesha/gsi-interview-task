import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { GeoListComponent } from "./components/GeoList/GeometricList";
import { GeoDetailComponent } from "./components/GeoDetails/GeometricDetail";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";
import { TableComponent } from "./components/Table/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    GeoListComponent,
    GeoDetailComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [GeoDetailComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
