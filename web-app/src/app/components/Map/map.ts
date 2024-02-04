import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import CircleStyle from "ol/style/Circle";
import { Style, Fill, Stroke } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { MapCommunicationService } from "../shared/map-communication.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.html",
  styleUrls: ["./map.scss"],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild("mapElement", { static: false }) mapElement: ElementRef;
  @ViewChild("info", { static: true }) infoElement: ElementRef;

  map: Map;
  vectorLayer: VectorLayer;

  constructor(private mapCommunicationService: MapCommunicationService) {}

  ngOnInit(): void {
    this.mapCommunicationService.geometries$.subscribe((geometries) => {
      this.renderGeometries(geometries);
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.addHoverInteraction();
  }

  initializeMap(): void {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 15,
      }),
    });
  }

  renderGeometries(data): void {
    const geoJsonFeatureCollection = {
      type: "FeatureCollection",
      features: data.map((item) => ({
        type: "Feature",
        geometry: {
          type: "GeometryCollection",
          geometries: item.geometry.geometries,
        },
        properties: {
          geom_id: item.geom_id,
          address: item.address,
          city: item.city,
          country: item.country,
          roof_material: item.roof_material,
          roof_type: item.roof_type,
          area: item.area,
          storeys: item.storeys,
          height: item.height,
        },
      })),
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geoJsonFeatureCollection, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    });

    this.vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({
            color: "red",
          }),
        }),
      }),
    });

    this.map.addLayer(this.vectorLayer);
    this.map.getView().fit(vectorSource.getExtent(), {
      padding: [50, 50, 50, 50],
      maxZoom: 18,
    });
    this.addHoverInteraction();
  }

  //This doesn't work as expected .. only works on click drag
  addHoverInteraction(): void {
    const infoOverlay = this.infoElement.nativeElement;

    this.map.on("pointermove", (evt) => {
      const pixel = this.map.getEventPixel(evt.originalEvent);
      const feature = this.map.forEachFeatureAtPixel(
        pixel,
        (feature) => feature
      );

      if (feature) {
        const properties = feature.getProperties();
        infoOverlay.innerHTML = `Address: ${properties.address}<br>City: ${properties.city}`;
        infoOverlay.style.display = "block";

        const overlayOffsetX = 10;
        const overlayOffsetY = 215;
        infoOverlay.style.left = `${pixel[0] + overlayOffsetX}px`;
        infoOverlay.style.top = `${pixel[1] + overlayOffsetY}px`;
      } else {
        infoOverlay.style.display = "none";
      }

      this.map.getTargetElement().style.cursor = feature ? "pointer" : "";
    });
  }
}
