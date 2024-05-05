import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { DetailsrecrutementService } from '../detailsrecrutement.service';
import { DetailRecrutement } from '../details-recrutement-modal/detail-recrutement.model';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { EventApi } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DetailsRecrutementModalComponent } from '../details-recrutement-modal/details-recrutement-modal.component';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventContent: this.renderEventContent.bind(this)
    
  };
  //events: EventInput[] = [];
  events: EventInput[] = [];
  list: any[] = [];

  constructor(private detailsrecrutementService: DetailsrecrutementService) { }
  ngOnInit(): void {
    this.detailsrecrutementService.getRendezVous().subscribe((datas) => {
      this.list = datas as any[];
      console.log(this.list);
      console.log("Données brutes:", datas);
      this.events = datas.map((item: any) => ({
        title: `${item[1]} ${item[2]}`,
        start: new Date(item[0]),
        typeRecrutement: item[3],
    }));
      console.log("Evénements pour le calendrier:", this.events);
    
      console.log(this.events); // Vérifiez les événements formatés avant de les affecter à calendarOptions
  
  // Update calendarOptions with new events
  this.calendarOptions = {
    ...this.calendarOptions,
    events: this.events,
    
  };
});
}
renderEventContent(arg: any) {
  return {
    html: `<b>${arg.event.title}</b>: ${arg.event.extendedProps.typeRecrutement}`
  };
}

}