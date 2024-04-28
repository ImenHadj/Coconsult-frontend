import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.css']
})
export class EditFournisseurComponent {

  fournisseur!: Fournisseur;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const fournisseurId = +id;
      if (!isNaN(fournisseurId)) {
        this.fournisseurService.retrieveFournisseur(fournisseurId).subscribe(
          (stock: any) => {
            this.fournisseur = stock;
          },
          (error) => {
            console.error('Error retrieving fournisseur:', error);
          
          }
        );
      } else {
        console.error('Invalid fournisseur ID');
     
      }
    } else {
      console.error('No fournisseur ID provided');
   
    }
  }

  updateFournisseur(): void {
    if (this.fournisseur) {
      this.fournisseurService.updateFournisseur(this.fournisseur).subscribe(
        () => {
          console.log('fournisseur updated successfully');
          this.router.navigate(['admin/fournisseur']); 
        },
        (error) => {
          console.error('Error updating fournisseur:', error);
        }
      );
    } else {
      console.error('fournisseur is not defined');
    }
  }

}
