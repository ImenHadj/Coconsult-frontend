import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjclientService } from '../projclient.service';
 import { Client } from "src/app/BackOffice/client.model";

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.css']
})
export class ClienthomeComponent implements OnInit{
  numberOfClients: number | undefined;
  constructor(private route: ActivatedRoute,private router: Router,private projclient:ProjclientService){}
  clients: any[] = [];
  projects: any[] = [];
  nom:String | undefined;
  prenom:String | undefined;
  ngOnInit(): void {
   
    console.log("onit.......................");

        this.projclient.clientsbyprod().subscribe((datas) => {
          this.clients = datas as any[];
         
        });
        

      }
    
      showproject(idClient: number , nom:String ,prenom :String ):void{
        this.nom=nom;
        this.prenom=prenom;
  this.projclient.projbyidclient(idClient).subscribe((datas) => {
    this.projects = datas as any[];
    console.log(this.projects)
   
  });
}
scrollToContent() {
  const contentElement = document.getElementById('scroll');
  if (contentElement) {
    contentElement.scrollIntoView({ behavior: 'smooth' });
  }
}
}