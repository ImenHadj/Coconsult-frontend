import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { ProjclientService } from '../Client/projclient.service';
import { MeetjoinService } from '../Client/meetjoin.service';

@Component({
  selector: 'app-joinmeet',
  templateUrl: './joinmeet.component.html',
  styleUrls: ['./joinmeet.component.css']
})
export class JoinmeetComponent {
  currentuser: any;
  id!:number;
  message="hello"

  constructor(private projclient:ProjclientService, private storageService: StorageService,private videocallservice:MeetjoinService){}
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.currentuser = this.storageService.getUser();
      this.id =  this.currentuser.id;
    }
    this.videocallservice.setMessage(this.message)

  }
  send():void{
    this.videocallservice.setMessage(this.message)
    console.log(this.videocallservice.getMessage)
  }
}
