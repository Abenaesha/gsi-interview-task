import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Geometry } from "src/app/services/geometry";

@Component({
  selector: "app-table",
  templateUrl: "./table.html",
  styleUrls: ["./table.scss"],
})
export class TableComponent implements OnInit {
  @Input() data: Geometry[] = [];
  @Input() columns: string[] = [];
  @Output() onRowClick = new EventEmitter<Geometry>();

  rowClicked(row: Geometry) {
    this.onRowClick.emit(row);
  }

  ngOnInit(): void {}
}
