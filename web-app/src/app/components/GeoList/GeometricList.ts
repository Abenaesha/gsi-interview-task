import { Component, OnInit } from "@angular/core";
import { Geometry, GeometryService } from "../../services/geometry";
import { GeoDetailComponent } from "../GeoDetails/GeometricDetail";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-geometries-list",
  templateUrl: "./geometries.list.html",
  styleUrls: ["./geometries.list.scss"],
})
export class GeoListComponent implements OnInit {
  geometries: Geometry[] = [];

  constructor(
    private geometryService: GeometryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGeometries();
  }

  loadGeometries(): void {
    this.geometryService.getGeometries().subscribe({
      next: (data) => {
        this.geometries = data;
      },
      error: (error) => console.error(error),
    });
  }

  openDialog(geometry?: Geometry): void {
    const dialogRef = this.dialog.open(GeoDetailComponent, {
      width: "750px",
      data: geometry || {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case "delete":
            this.geometryService.deleteGeometry(result.data.geom_id).subscribe({
              next: () => {
                this.loadGeometries();
                console.log("Delete Successful: ", result.data);
              },
              error: (error) => console.error("Delete failed", error),
            });
            break;
          case "update":
            this.geometryService
              .updateGeometry(result.data.geom_id, result.data)
              .subscribe({
                next: (updateGeometry) => {
                  this.loadGeometries();
                  console.log("Update Successful: ", updateGeometry);
                },
                error: (error) => console.error("Update failed", error),
              });
            break;
          case "create":
            this.geometryService.addGeometry(result.data).subscribe({
              next: (newGeometry) => {
                console.log("Create Successful: ", newGeometry);
                this.loadGeometries();
              },
              error: (error) => console.error("Creation failed", error),
            });
            break;
          default:
            break;
        }
      }
    });
  }

  createNewGeometry(): void {
    this.openDialog();
  }
}
