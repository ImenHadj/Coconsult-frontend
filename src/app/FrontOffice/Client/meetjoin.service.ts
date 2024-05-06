import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetjoinService {

  message!: string;

constructor(){}
setMessage(data: string){
  this.message=data
}
getMessage(){
  return this.message
}
}
