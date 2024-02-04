import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Geometry } from "src/app/services/geometry";

@Injectable({
  providedIn: "root",
})
export class MapCommunicationService {
  private geometriesSource = new Subject<Geometry[]>();
  geometries$ = this.geometriesSource.asObservable();

  constructor() {}

  updateGeometries(geometries: Geometry[]): void {
    this.geometriesSource.next(geometries);
  }
}
