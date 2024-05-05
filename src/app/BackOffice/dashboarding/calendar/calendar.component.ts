import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { Conge } from 'src/app/core/models/conge.model';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements	OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    
  };
  
  conges: any[] = [];
  events: EventInput[] = [];
  projectId: any;
 
  constructor(private route: ActivatedRoute, private congeservice: ServiceCongeService) { }

  ngOnInit(): void {
    this.loadAbsences();
  }
  
  private loadAbsences():void {
    this.congeservice.getall().subscribe((absences) => {
      this.conges = absences;
      this.updateEvents();
    },
    (error: any) => {
      console.error('Error fetching absences:', error);
    }
    );
  }
  
  updateEvents(): void {
    if (this.conges) {
      this.events = this.conges.map(task => ({
        title: task.commentaire.toString(),
        start: task.date_debut,
        end: task.date_fin,
      }));
    }
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
    console.log('Events:', this.calendarOptions.events); // Check events in console
  }

}
