import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
	lat:string;
	long:string;
	location=
	{
		"latitude":'1',
		"longitude":'1'
	}
	// server = "http://35.200.250.64:8002";
	server = "http://127.0.0.1:8000";
  	constructor(public http:Http) { }

	getUsers(){
		return this.http.get(this.server+'/userauth/?username=garvit').map(res=>res.json());
	}
	getFarm(){
		return this.http.get(this.server+'/farm/?username=garvit').map(res=>res.json());
	}
	getCrops(farm_id){
		return this.http.get(this.server+'/crop/?farm_id='+farm_id).map(res=>res.json());
	}
	getSensors(crop_id){
		return this.http.get(this.server+'/sensor/?crop_id='+crop_id).map(res=>res.json());
	}
	getWeatherData(){
		return this.http.get(this.server+'http://api.openweathermap.org/data/2.5/forecast?lat=13.553271&lon=80.018179&units=metric&APPID=e372629b1d097d7fe3fb3cd87dcd3f6b').map(res=>res.json());
	}
	sendLatLng(lat,lng){
		console.log(lat,lng);
		this.lat=lat;
		this.long=lng;
	}
	getLatLng(){
		this.location.latitude= this.lat,
		this.location.longitude= this.long
		console.log(this.location)
	}
	
	getItems(){
		return this.http.get(this.server+'/items/?username=garvit').map(res=>res.json());
	}
	postItem(body){
		return this.http.post(this.server+'/items/',body).map(res=>res.json());
	}
	postTranscation(body){
		return this.http.post(this.server+'/transaction/',body).map(res=>res.json());
	}
	getBuyer(item_id)
	{
		return this.http.get(this.server+'/transaction/?item_id='+item_id).map(res=>res.json());
	}
	postCropImg(formdata){
		return this.http.post(this.server+'/crop/',formdata).map(res=>res.json());
	}
	// getTransactions(){
	// 	return this.http.get('http://127.0.0.1:8000/items/?username=garvit').map(res=>res.json());
	// }
}
