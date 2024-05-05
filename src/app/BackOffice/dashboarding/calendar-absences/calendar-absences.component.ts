import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { Conge } from 'src/app/core/models/conge.model';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ServiceAbsenceService } from 'src/app/core/services/service-absence.service';

@Component({
  selector: 'app-calendar-absences',
  templateUrl: './calendar-absences.component.html',
  styleUrls: ['./calendar-absences.component.css']
})
export class CalendarAbsencesComponent implements	OnInit{

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    
  };
  
  conges: any[] = [];
  events: EventInput[] = [];
  projectId: any;
 
  constructor(private route: ActivatedRoute, private congeservice: ServiceAbsenceService) { }

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
        title: task.motif,
        start: task.date
      }));
    }
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
    console.log('Events:', this.calendarOptions.events); // Check events in console
  }
}
