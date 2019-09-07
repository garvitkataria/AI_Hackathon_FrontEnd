import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }
  addFarm(name, address, lat, long)
  {
      console.log(name, address, lat, long);
      
     //  this.dataService.getLatLng().subscribe((res)=>{
     //    console.log(res);
     // });
  }

}
