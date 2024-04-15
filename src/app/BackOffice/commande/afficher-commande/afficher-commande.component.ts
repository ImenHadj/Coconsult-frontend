import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-afficher-commande',
  templateUrl: './afficher-commande.component.html',
  styleUrls: ['./afficher-commande.component.css'],
  providers:[CommandeService]
})
export class AfficherCommandeComponent {
  commandes: any[] = [];

  constructor(private commandeservice:CommandeService,
    private router: Router){}

  /*getall*/
    ngOnInit(): void {
      console.log("onit.......................");
      this.commandeservice.getCommandes().subscribe((datas)=>{
        this.commandes=datas as any[];
      })
    }
  
    /*remove*/
    removeCommande(id: number): void {
      this.commandeservice.removeCommande(id).subscribe(() => {  
        this.commandeservice.getCommandes().subscribe((datas) => {
          this.commandes = datas as any[];
        });
      });
    }

    marquerCommandeCommeArrivee(id: number): void {
      this.commandeservice.marquerCommandeCommeArrivee(id).subscribe(() => {
        this.commandeservice.getCommandes().subscribe((datas) => {
          this.commandes = datas as any[];
        });
      });
    }

}
