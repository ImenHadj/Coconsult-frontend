import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { Conge } from 'src/app/core/models/conge.model';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ServiceAbsenceService } from 'src/app/core/services/service-absence.service';
import { Absence } from 'src/app/core/models/absence.model';

@Component({
  selector: 'app-historique-employee',
  templateUrl: './historique-employee.component.html',
  styleUrls: ['./historique-employee.component.css']
})
export class HistoriqueEmployeeComponent implements OnInit {
//   absences: Absence[] = [];
//   conges: Conge[] = [];
//   employeeId: number | null = null;

//   constructor(private absenceService: ServiceAbsenceService,
//     private congeService: ServiceCongeService,
//         private route: ActivatedRoute,
//         private router: Router) { }

//   private getEmployee(): void {
//     this.route.params.subscribe((params) => {
//       const id = params['employeeId'];
//       if (id) {
//         this.employeeId = +id;
//       }
//     });
//   }

//   ngOnInit(): void {

//     this.getEmployee();
//     this.getAbsencesAndCongesByEmployeeId();
//   }

//   getAbsencesAndCongesByEmployeeId(): void {
//     if (this.employeeId !== null) {

//     this.absenceService.getAbsencesByEmployeeId(this.employeeId)
//       .subscribe(absences => this.absences = absences);

//     this.congeService.getCongesByEmployeeId(this.employeeId)
//     .subscribe(conges=> this.conges = conges);
//   }
// }
calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin, interactionPlugin],
  eventClassNames: (info) => {
    const eventType = info.event.extendedProps['type'];
    if (eventType === 'conge') {
      return ['conge-event']; // Classe CSS pour les événements de congé
    } else if (eventType === 'absence') {
      return ['absence-event']; // Classe CSS pour les événements d'absence
    } else {
      return ['autre-event']; // Classe CSS pour les autres événements
    }
  },
};

conges: Conge[] | undefined ;
absences:Absence[] | undefined
events: EventInput[] = [];
EmployeeId: any;

constructor(private route: ActivatedRoute, private absenceservice: ServiceAbsenceService,
  private congeservice: ServiceCongeService ) { }

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const projectIdParam = params.get('employeeId');
    if (projectIdParam !== null) {
      this.EmployeeId = +projectIdParam;
      if (this.EmployeeId) {
        this.absenceservice.getAbsencesByEmployeeId(this.EmployeeId).subscribe(tasks => {
          console.log('Tasks:', tasks);
          this.updateEvents();
        });
        this.congeservice.getCongesByEmployeeId(this.EmployeeId).subscribe(tasks => {
          console.log('Tasks:', tasks);
          this.conges = tasks;
          this.updateEvents();
        });
      }
    } else {
      console.error("Project ID parameter is null");
    }
  });
}


updateEvents(): void {
  if (this.absences) {
    this.events = this.absences.map(task => ({
      title: task.motif,
      start: task.date,
      type: 'absence' // Ajoutez une propriété 'type' pour les absences

    }));
  }
  if (this.conges) {
    this.events = this.conges.map(task => ({
      title: task.commentaire.toString(),
      start: task.date_debut,
      end: task.date_fin,
      type: 'conge' // Ajoutez une propriété 'type' pour les congés

    }));
  }
  this.calendarOptions = {
    ...this.calendarOptions,
    events: this.events
  };
  console.log('Events:', this.calendarOptions.events);

}

}


