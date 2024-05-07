import { Component, OnInit } from '@angular/core';
import { ServicerecrutementService } from 'src/app/BackOffice/servicerecrutement.service';
import { Recrutement } from 'src/app/BackOffice/recrutement.model';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-allrecrutement',
    templateUrl: './allrecrutement.component.html',
    styleUrls: ['./allrecrutement.component.css'],
    providers: [ServicerecrutementService],
})
export class AllrecrutementComponent implements OnInit {
    recrutements: Recrutement[] = [];
    searchText: string = '';

    constructor(private router: Router, private recrutementService: ServicerecrutementService) {}

    ngOnInit(): void {
        // Appel du service pour obtenir les recrutements
        this.recrutementService.getAll().subscribe((data: Recrutement[]) => {
            this.recrutements = data;
        });
    }

    isButtonDisabled(dateCloture: any, postesVacants: any): boolean {
        const dateClotureDate = new Date(dateCloture);
        const dateNow = new Date();
        return dateClotureDate < dateNow || postesVacants === 0;
    }
}
