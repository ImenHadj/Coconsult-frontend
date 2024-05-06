import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjclientService } from '../projclient.service';
 import { Client } from "src/app/BackOffice/client.model";
 import { StorageService } from 'src/app/_services/storage.service';
 import { meethistory } from '../meethistory.model';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.css']
})
export class ClienthomeComponent implements OnInit{
  numberOfClients: number | undefined;
  currentuser: any;
  constructor(private route: ActivatedRoute,private router: Router,private projclient:ProjclientService, private storageService: StorageService){}
  clients: any[] = [];
  projects: any[] = [];
  sprojects: any[] = [];
  nom:String | undefined;
  prenom:String | undefined;
  meet !:meethistory ;
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.currentuser = this.storageService.getUser();
    }

    console.log("onit  this.id" + this.currentuser.id,this.currentuser.username,this.currentuser.email)

    this.projclient.getprojectforPO(this.currentuser.id).subscribe((datas) => {
      this.projects = datas as any[]; });
      console.log("projects"+this.projects[0])

      /*  this.projclient.clientsbyprod().subscribe((datas) => {
          this.clients = datas as any[];
         
        });*/
        

      }
    
      showproject(idClient: number , nom:String ,prenom :String ):void{
        this.nom=nom;
        this.prenom=prenom;
  this.projclient.projbyidclient(idClient).subscribe((datas) => {
    this.sprojects = datas as any[];
    console.log(this.sprojects)
   
  });
}
scrollToContent() {
  const contentElement = document.getElementById('scroll');
  if (contentElement) {
    contentElement.scrollIntoView({ behavior: 'smooth' });
  }
}


}
