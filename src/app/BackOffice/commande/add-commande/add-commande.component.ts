import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from '../../Fournisseur/fournisseur.model';
import { FournisseurService } from '../../Fournisseur/fournisseur.service';
import { Commande } from '../commande.model';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent {
  
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
