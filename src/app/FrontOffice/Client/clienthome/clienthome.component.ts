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
  ngOnInit(): void {
   
    console.log("onit.......................");

        this.projclient.clientsbyprod().subscribe((datas) => {
          this.clients = datas as any[];
          console.log("clientsfound"+this.clients[0]);
          this.numberOfClients = this.clients.length;
          console.log("  this.numberOfClients = "+  this.numberOfClients )
        });
      }
    


}
