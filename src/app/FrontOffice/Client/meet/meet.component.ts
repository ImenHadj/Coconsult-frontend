import { Component, Input, OnInit } from '@angular/core';
 import { Client } from "src/app/BackOffice/client.model";
 import { StorageService } from 'src/app/_services/storage.service';
 import { meethistory } from '../meethistory.model'; 
 import { ProjclientService } from '../projclient.service'; 
 import { MeetjoinService } from '../meetjoin.service';
 declare var window: any;

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit{
  meet !:meethistory ;
  currentuser: any;
  startdate: string ="datedebut";
  message?: string;

  constructor(private projclient:ProjclientService, private storageService: StorageService,private meetjoinService :MeetjoinService){}
  ngOnInit(): void {
    
    this.meet = {} as meethistory;
    if (this.storageService.isLoggedIn()) {
      this.currentuser = this.storageService.getUser();
    }
   

  }



starttream(): void {
  this.startdate = new Date().toISOString();
}
addmeethistory(): void {
  this.meet.datedebut =   this.startdate
  this.meet.datefin = new Date().toISOString();
  this.meet.iduser1 = this.currentuser.id;
  this.meet.nomuser1 = this.currentuser.username;


  this.projclient.addmeethistory(this.meet).subscribe(
    (id) => {
      console.log('meet histroy added successfully with ID:', id);
    },
    (error) => {
      console.error('Error adding meet history:', error);
    }
  )
}





}



