import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commande } from 'src/app/BackOffice/commande/commande.model';
import { CommandeService } from 'src/app/BackOffice/commande/commande.service';
import { Fournisseur } from 'src/app/BackOffice/Fournisseur/fournisseur.model';
import { FournisseurService } from 'src/app/BackOffice/Fournisseur/fournisseur.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent {

  commandeForm!: FormGroup;
  fournisseurs: Fournisseur[] = [];
  selectedFournisseur: Fournisseur | null = null;
  showStep1 = true;

  constructor(private fb: FormBuilder, private commandeservice: CommandeService, private fournisseurservice : FournisseurService ) {
    this.createForm();
  }

  createForm(): void {
    this.commandeForm = this.fb.group({
      quantity: ['', Validators.required],
      location: ['', Validators.required],
      categorieStock: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
  }

  selectFournisseur(fournisseur: Fournisseur): void {
    this.selectedFournisseur = fournisseur;
  }

  onNextStep(): void {
    this.showStep1 = false;
  }

  isSelected(fournisseur: Fournisseur): boolean {
    // Vérifier si le fournisseur est égal au fournisseur sélectionné
    return this.selectedFournisseur === fournisseur;
}

  onSave(): void {
    if (this.commandeForm.valid && this.selectedFournisseur) {
      const commandeData: Commande = this.commandeForm.value;
      commandeData.fournissID = this.selectedFournisseur.fournisseurID;
      this.commandeservice.addCommande(commandeData).subscribe(
        (commandeId) => {
          console.log('commande added successfully with ID:', commandeId);
          // Réinitialiser le formulaire et le fournisseur sélectionné après l'ajout de la commande
          this.commandeForm.reset();
          this.selectedFournisseur = null;
          this.showStep1 = true;
        },
        (error) => {
          console.error('Error adding commande:', error);
        }
      );
    }
  }

  onCategorySelect(): void {
    const categorie = this.commandeForm.get('categorieStock')?.value;
    if (categorie) {
      this.commandeservice.retrieveFournisseurByCategorie(categorie).subscribe(
        (fournisseurs) => {
          this.fournisseurs = fournisseurs;
        },
        (error) => {
          console.error('Error fetching fournisseurs by category:', error);
        }
      );
    }
  }
}
