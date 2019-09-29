import { MouseEvent } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import {DataService} from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

// google maps zoom level
  zoom: number = 15;
  
  // initial center position for the map
  lat: number = 13.556907;
  lng: number = 80.025081;
  crop:any;
  markers: marker[] = [];
	constructor(private dataService:DataService) {
		this.crop = JSON.parse(localStorage.getItem("ImgInMap"));
    	console.log("In Map",this.crop)
    	this.lat =  this.crop.latitude
    	this.lng = this.crop.longitude
    	  this.markers = [
				  {
					  lat: this.lat,
					  lng: this.lng,
					  label: 'Image',
					  draggable: false,
				  },
				  // {
					 //  lat: 13.8003740389264,
					 //  lng: 79.3526480580017,
					 //  label: 'Farm 2',
					 //  draggable: false
				  // },
				  // {
					 //  lat: 13.297139222037586,
					 //  lng: 79.7082977226562,
					 //  label: 'Farm 3',
					 //  draggable: false
				  // },
				  // {
					 //  lat: 13.699635861076857,
					 //  lng: 80.01559764274464,
					 //  label: 'Farm 4',
					 //  draggable: false
				  // },
				  // {
					 //  lat: 13.720982439094989,
					 //  lng: 80.18588572868214,
					 //  label: 'Farm 5',
					 //  draggable: false
				  // }
			  ]
	}
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  //   this.dataService.sendLatLng($event.coords.lat,$event.coords.lng);
  // }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
