import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceclientService } from '../serviceclient.service';
import { Client } from '../client.model';
import { Contrat } from '../contrat.model';
import{contratNotif} from "../notif.model"

@Component({
  selector: 'app-notiflog',
  templateUrl: './notiflog.component.html',
  styleUrls: ['./notiflog.component.css']
})
export class NotiflogComponent implements OnInit{
  id!: number ;
  contratNotifs!: contratNotif[];



  constructor(private route: ActivatedRoute,private router: Router,private clientservice:ServiceclientService){}
  ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.clientservice.lognotification(this.id).subscribe((datas) => {
          this.contratNotifs = datas as contratNotif[];
          this.contratNotifs.forEach(notif => {
            console.log("heheh", notif); 
          });
        });
      }
    });
  }

  
  sendreminer(id:number){
    this.clientservice.singleremiender(id).subscribe(
      (id) => {
        console.log('email sent successfully with contrat ID:', id);
       
      },
      (error) => {
        console.error('Error sending  email:', error);
      }
    );

  }

testreminder(){
  this.clientservice.singleremiender(3).subscribe();
}
}
