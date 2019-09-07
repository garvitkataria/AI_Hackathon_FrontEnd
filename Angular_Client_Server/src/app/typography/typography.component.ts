import {Component, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent  {
  farm_id:string='1';
  crop_id:string;
  crops:crop[];

   
 
    constructor(private dataService:DataService, private router:Router, private activatedRouter:ActivatedRoute) {
    console.log("starting dataService...")


    this.activatedRouter.params.subscribe(params=>{
      this.farm_id=params['farm_id']
      console.log("farm_id",this.farm_id)
    })
    this.dataService.getUsers().subscribe((users)=>{
      console.log(users);
    });


     this.dataService.getCrops(this.farm_id).subscribe((crops)=>{
        console.log("Crops",crops);
        this.crops=crops
     });
    }
    
    }
    interface crop
  {
        "id":string,
        "crop_type": string,
        "longitude": string,
        "latitude": string,
        "created_on": string,
        "cropImageAnnotated": string,
        "cropImage": string
  }