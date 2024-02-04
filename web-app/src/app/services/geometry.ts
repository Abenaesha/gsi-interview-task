import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface Geometry {
  address: string;
  area: number;
  city: string;
  country: string;
  geom_id: string;
  height: number;
  roofMaterial: string;
  roofType: string;
  storeys: number;
  geometry: any;
}

@Injectable({
  providedIn: "root",
})
export class GeometryService {
  private apiUrl = "http://localhost:3000/buildings";

  constructor(private http: HttpClient) {}

  getGeometries(): Observable<Geometry[]> {
    return this.http
      .get<{ data: Geometry[] }>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  addGeometry(addData: Geometry): Observable<Geometry> {
    const { geometry } = addData;
    if (typeof geometry === "string") {
      try {
        addData.geometry = JSON.parse(geometry);
      } catch (error) {
        console.error("Error parsing GeoJSON:", error);
      }
    }

    return this.http.post<Geometry>(this.apiUrl, addData);
  }

  updateGeometry(
    geom_id: string,
    updateData: Partial<Geometry>
  ): Observable<Geometry> {
    const url = `${this.apiUrl}/${geom_id}`;
    const { geometry } = updateData;
    if (typeof geometry === "string") {
      try {
        updateData.geometry = JSON.parse(geometry);
      } catch (error) {
        console.error("Error parsing GeoJSON:", error);
      }
    }

    return this.http.patch<Geometry>(url, updateData);
  }

  deleteGeometry(geom_id: string): Observable<any> {
    const url = `${this.apiUrl}/${geom_id}`;
    return this.http.delete(url);
  }
}
