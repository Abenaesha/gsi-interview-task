import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Geometry } from "../../services/geometry";
import { jsonValidator } from "../../utils/utils";

@Component({
  selector: "app-geometry-detail",
  templateUrl: "./geometries.detail.html",
  styleUrls: ["./geometries.detail.scss"],
})
export class GeoDetailComponent implements OnInit {
  detailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<GeoDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Geometry
  ) {
    this.detailForm = this.fb.group({
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      roofMaterial: [""],
      roofType: [""],
      area: [null, Validators.required],
      storeys: [null],
      height: [null],
      geometry: ["", jsonValidator],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.detailForm.patchValue({
        address: this.data.address,
        city: this.data.city,
        country: this.data.country,
        roofMaterial: this.data.roofMaterial,
        roofType: this.data.roofType,
        area: this.data.area,
        storeys: this.data.storeys,
        height: this.data.height,
        geometry: JSON.stringify(this.data.geometry),
      });
    }
  }

  onDelete(): void {
    if (this.detailForm.valid) {
      const formData = {
        ...(this.data.geom_id && { geom_id: this.data.geom_id }),
      };

      this.dialogRef.close({ action: "delete", data: formData });
    }
  }

  onSubmit(): void {
    if (this.detailForm.valid) {
      const formData = {
        ...this.detailForm.value,
        ...(this.data.geom_id && { geom_id: this.data.geom_id }),
      };

      const action = this.isNewGeometry() ? "create" : "update";

      this.dialogRef.close({ action, data: formData });
    }
  }

  private isNewGeometry(): boolean {
    return !this.data || !this.data.geom_id;
  }
}
