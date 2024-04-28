import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ServiceclientService } from '../serviceclient.service';
import { Router } from '@angular/router';
import { EventApi } from '@fullcalendar/core'; 
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
  
})
export class CalenderComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    
    plugins: [dayGridPlugin, interactionPlugin],
    
  };

  events: EventInput[] = [];
  list: any[] = [];

  constructor(private router: Router, private clientservice: ServiceclientService) {}

  ngOnInit(): void {
    this.clientservice.getcallender(30).subscribe((datas) => {
      this.list = datas as any[];
      console.log(this.list);

      // Update events array
      this.events = datas.map((item: { nom: any; prenom: any; dueDate: any }) => ({
        title: `${item.nom} ${item.prenom}`,
         
        start: item.dueDate,
        
      }));

      // Update calendarOptions with new events
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.events,
        
      };
    });
  }
}
