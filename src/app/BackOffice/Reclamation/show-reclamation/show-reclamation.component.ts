import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from '../reclamation.model';
import { ReclamationService } from '../reclamation.service';

@Component({
  selector: 'app-show-reclamation',
  templateUrl: './show-reclamation.component.html',
  styleUrls: ['./show-reclamation.component.css'],
  providers: [ReclamationService]
})
export class ShowReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  p: number = 1;

  constructor(private reclamationService: ReclamationService,
              private router: Router) { }

  ngOnInit(): void {
    this.reclamationService.getReclamations().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }

  removeReclamation(id: number): void {
    this.reclamationService.removeReclamation(id).subscribe(() => {
      this.reclamationService.getReclamations().subscribe(
        (data: Reclamation[]) => {
          this.reclamations = data;
        },
        (error) => {
          console.error('Error fetching reclamations after removal:', error);
        }
      );
    });
  }

  updateReclamation(reclamation: Reclamation): void {
    this.reclamationService.updateReclamation(reclamation).subscribe(
      (updatedReclamation: Reclamation) => {
        console.log('Reclamation updated successfully:', updatedReclamation);
        this.reclamationService.getReclamations().subscribe(
          (data: Reclamation[]) => {
            this.reclamations = data;
          },
          (error) => {
            console.error('Error fetching reclamations after update:', error);
          }
        );
      },
      (error) => {
        console.error('Error updating reclamation:', error);
      }
    );
  }

  editReclamation(reclamation: Reclamation): void {
    console.log('Edit button clicked for reclamation:', reclamation);
    this.router.navigate(['/admin/edit-reclamation', reclamation.reclamationID]);
  }
}
