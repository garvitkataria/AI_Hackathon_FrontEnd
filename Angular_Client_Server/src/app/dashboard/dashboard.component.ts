import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {DataService} from '../services/data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {OnDestroy} from '@angular/core';
import {ConnectionStatus, MqttService, SubscriptionGrant} from 'ngx-mqtt-client';
import {IClientOptions} from 'mqtt';
declare var $: any;

export interface Foo {
    bar: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  server = "http://127.0.0.1:8000"
  flag_crop_images=0;
  farm_id:string;
  crop_id:string;
  crops:crop[];

  filter_crops:crop[];

  crop_show:crop;
  sensors:sensor[];
  weatherApiData:weatherApiData[];
  
  messages: Array<Foo> = [];
  status: Array<string> = [];

  items:item[];
  Total=0.0

  chart_labels=[];
  chart_values=[
  []
  ];

  files:any[];
  file_status=0;
  constructor(private dataService:DataService, private router:Router, private activatedRouter:ActivatedRoute, private _mqttService: MqttService ) 
  {
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
        this.filter_crops = crops
        if(this.crops.length>=1)
          this.crop_show = this.crops[0]
     });
   }
   viewMap(crop)
   {
       console.log("view Map",crop)
       localStorage.setItem('ImgInMap',   JSON.stringify(crop));
       this.router.navigate(['/maps'])

   }
   showCropImage(crop)
   {
     this.crop_show = crop
   }
   toggleDashboard()
   {
     this.flag_crop_images=(this.flag_crop_images)?0:1;
   }
showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      let color = Math.floor((Math.random() * 4) + 1);
      color = 2;
      $.notify({
          icon: "info",
          message: "<ul><li>Coordinates: 98.65, 65.38</li> <li>Altitude: 1015 m</li> <li>Total Crops: 4000</li>"

      },{
          type: type[color],
          timer: 500,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">info</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

   
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'],
          series: [
              [4000, 3000, 3000, 3600, 4500, 4700, 4000, 3000, 3000, 3600, 4500, 5700]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 8000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
          this.dataService.getItems().subscribe((res)=>{
            this.Total=0
           console.log(res);
           this.items=res;
           for (var i = this.items.length - 1; i >= 0; i--) {
             if(this.items[i].sold)
             {
               this.Total=this.items[i].product_price+this.Total;
               this.chart_labels.push('id:'+this.items[i].id)
               this.chart_values[0].push(this.items[i].product_price)
             }
             console.log(this.Total)
           }
        
      const dataCompletedTasksChart: any = {
          labels: this.chart_labels,
          series: this.chart_values,
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);
      });

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [2000, 2300, 2600, 3000, 3500, 4000, 4500, 3000, 3600, 0, 0, 0]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 8000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }
  WeatherData()
  {
      this.dataService.getWeatherData().subscribe((data)=>{
        console.log(data);
        this.weatherApiData=data.list
        console.log("this.weatherApiData",this.weatherApiData)
      });
  }
  cropSensors(crop_id)
  {
    this.crop_id=crop_id
    console.log(crop_id)
    this.dataService.getSensors(crop_id).subscribe((sensors)=>{
        this.sensors=sensors;
        for(var i = 0; i < this.sensors.length; ++i) {
          if(sensors[i].sensor_type=="Water Level")
          {
            sensors[i].color="card-header-info";
            sensors[i].icon="https://png.pngtree.com/svg/20170828/water_tank_174464.png";

          }
          else if(sensors[i].sensor_type=="Turbidity")
          {
            sensors[i].color="card-header-muted";
            sensors[i].icon="https://png.pngtree.com/svg/20170725/turbidity_629720.png";
          }
          else if(sensors[i].sensor_type=="Temperature")
          {
            sensors[i].color="card-header-danger";
            sensors[i].icon="https://cdn3.iconfinder.com/data/icons/weather-1-8/128/Thermometer-Wheather-Forecast-Temp-Temperature-Climate-512.png";
          }
          else if(sensors[i].sensor_type=="Soil Moisture")
          {
            sensors[i].color="card-header-success";
            sensors[i].icon="https://png.pngtree.com/svg/20170914/sk_soil_moisture_yue_yue_630637.png";
          }
          else if(sensors[i].sensor_type=="Humidity")
          {
            sensors[i].color="card-header-primary";
            sensors[i].icon="https://cdn2.iconfinder.com/data/icons/network-sensors/201/humidity-512.png";
          }
          else if(sensors[i].sensor_type=="Actuator")
          {
            sensors[i].color="card-header-warning";
            sensors[i].icon="https://png.pngtree.com/svg/20170413/cooling_pump_561545.png";
          }
          sensors[i].current_data="0";
          console.log(i,sensors[i],sensors[i].id);
        }
     });
   }


   filesPicked(files) 
   {  
        this.files =files
        
   }
   upload()
   {
      for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];
          const path = file.webkitRelativePath.split('/');
          console.log(file);
          const formData = new FormData();
          formData.append('farm_id', this.farm_id);
          formData.append('cropImage', file);
          this.dataService.postCropImg(formData).subscribe(
            (data)=>{
              console.log(data);
              this.file_status=1;
            },
            (err)=>{
              this.file_status=0;
            }
            );
      }
   }
  goToCropImage()
  {
    console.log("farm_id",this.farm_id)
    this.router.navigate(['/typography',this.farm_id])

  }
  filterDate(d)
  {
    this.crops = this.filter_crops
    console.log("filterDate",d);
    const date_now = new Date()
    const day_now = date_now.getDate()
    const month_now = date_now.getMonth()
    const year_now = date_now.getFullYear()
    console.log(day_now,month_now,year_now)
    if(d=="till_now")
    {
      this.crops =this.filter_crops
    }
    else if(d=="today")
    {
      this.crops = []
      for (var i = 0; i < this.filter_crops.length; ++i) 
      {
        const dt = new Date(this.filter_crops[i].created_on);
        const dt_day = dt.getDate()
        const dt_month = dt.getMonth()
        const dt_year = dt.getFullYear()
        if((year_now==dt_year)&&(month_now==dt_month)&&(day_now==dt_day))
          this.crops.push(this.filter_crops[i])
        console.log(dt_day,dt_month,dt_year)
      }
      console.log(this.crops)
    }
    else if(d=="this_week")
    {
        this.crops = []
        for (var i = 0; i < this.filter_crops.length; ++i) 
        {
            const dt = new Date(this.filter_crops[i].created_on);
            const dt_day = dt.getDate()
            const dt_month = dt.getMonth()
            const dt_year = dt.getFullYear()
            if( (year_now==dt_year) && (month_now==dt_month) && (day_now-dt_day<7) )
              this.crops.push(this.filter_crops[i])
            console.log(dt_day,dt_month,dt_year)
        }
        console.log(this.crops)
    }
    else if(d=="this_month")
    {
      this.crops = []
        for (var i = 0; i < this.filter_crops.length; ++i) 
        {
            const dt = new Date(this.filter_crops[i].created_on);
            const dt_day = dt.getDate()
            const dt_month = dt.getMonth()
            const dt_year = dt.getFullYear()
            if((year_now==dt_year)&&(month_now==dt_month))
              this.crops.push(this.filter_crops[i])
            console.log(dt_day,dt_month,dt_year)
        }
        console.log(this.crops)
    }
    else if(d=="this_year")
    {
      this.crops = []
        for (var i = 0; i < this.filter_crops.length; ++i) 
        {
            const dt = new Date(this.filter_crops[i].created_on);
            const dt_day = dt.getDate()
            const dt_month = dt.getMonth()
            const dt_year = dt.getFullYear()
            if((year_now==dt_year))
              this.crops.push(this.filter_crops[i])
            console.log(dt_day,dt_month,dt_year)
        }
        console.log(this.crops)
    }
  }
  filterImage(x)
  {
      this.crops =this.filter_crops
      if(x==1)
      {
        console.log("Testing...",x)
        this.crops =this.filter_crops
      }
      else if(x==2)
      {
          console.log("Testing...",x)
          this.crops = []
          for (var i = 0; i < this.filter_crops.length; ++i) 
          {
            console.log(this.filter_crops[i].total_crops)
            if(this.filter_crops[i].total_crops < 3000)
              this.crops.push(this.filter_crops[i])
          }
      }
      else if(x==3)
      {
          console.log("Testing...",x)
          this.crops = []
          for (var i = 0; i < this.filter_crops.length; ++i) 
          {
            console.log(this.filter_crops[i].total_crops)
            if(this.filter_crops[i].total_crops < 1500)
              this.crops.push(this.filter_crops[i])
          }
      }
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
        "cropImage": string,
        "total_crops":number,
        "altitude":number,
  }
 interface sensor
 {
        "id":string,
        "sensor_type": string,
        "longitude": string,
        "latitude": string,
        "created_on": string,
        "color":string,
        "icon":string,
        "current_data":string
 }
 interface main
 {
    "temp": string,
    "temp_min": string,
    "temp_max": string,
    "pressure": string,
    "sea_level": string,
    "grnd_level": string,
    "humidity": string,
    "temp_kf": string
}
interface wind 
{
    "speed": string,
    "deg": string
}
interface weather
{
    "id": string,
    "main": string,
    "description": string,
    "icon":string
}

interface weatherApiData
{
    "dt_txt":string,
    "main":main,
    "wind":wind,
    "weather":weather[]
}
interface item
  {
      "id":string,
      "product_title": string,
      "product_description": string,
      "product_price": any,
      "product_quantity":any,
      "itemImage": string,
      "sold": string,
      "created_on": boolean
  }
