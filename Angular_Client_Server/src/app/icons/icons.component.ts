import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import * as Chartist from 'chartist';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
	farms:farm[];
  userP:userProfile;
	img:string

  items:item[];
  Total=0.0;
  chart_labels=[];
  chart_values=[
  []
  ];
  	constructor(private dataService:DataService, private router:Router) {
  		this.dataService.getUsers().subscribe((user)=>{
     	console.log(user);
      this.userP=user
    });

     this.dataService.getFarm().subscribe((farms)=>{
        console.log(farms);
        this.farms=farms
        console.log("http://127.0.0.1:8000"+farms[2].farmImage);
        this.img="http://127.0.0.1:8000"+farms[2].farmImage
        // this.userP=farms
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
          labels: ['Farm-1', 'Farm-2', 'Farm-3', 'Farm-4', 'Farm-5'],
          series: [
              [6000, 4000, 3000, 5000, 4050]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 10000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
          [1420, 1000, 2000, 2300, 2000, 2000, 3300, 3000, 3900, 0, 0, 0]

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
  goToCrops(farm_id)
  {
  	console.log("farm_id",farm_id)
  	this.router.navigate(['/dashboard',farm_id])

  }
  addFarm(farm_name,about,latitude,longitude)
  {
    console.log(
    {
      "farmer_username":this.userP.username,
      "farm_name":farm_name,
      "about":about,
      "longitude":longitude,
      "latitude":latitude
    })
  }

}

interface farm
  {
  		"id":string,
    	"farm_name": string,
        "about": string,
        "farmImage": string,
        "longitude": string,
        "latitude": string,
        "created_on": string
  }
 interface userProfile
  {
      "username": string,
      "first_name": string,
      "last_name": string,
      "email": string,
      "mobile_no": string,
      "avatar": string,
      "is_farmer": boolean
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
