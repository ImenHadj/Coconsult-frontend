import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture.model';
import { Client } from '../client.model';
import { Paiment } from "../paiment.model";
import { Contrat } from '../contrat.model';
import { ServiceclientService } from '../serviceclient.service';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-detailfacture',
  templateUrl: './detailfacture.component.html',
  styleUrls: ['./detailfacture.component.css']
})
export class DetailfactureComponent implements OnInit{

  idfacture!: number
  facture!:Facture 
  amountleft:number | undefined;
  constructor(private route: ActivatedRoute,private router: Router, private clientservice:ServiceclientService){}

  ngOnInit(): void {
  
      
      this.route.queryParams.subscribe(params => {
        this.idfacture = +params['id'];
        console.log(this.idfacture +" hahayka");
        this.clientservice.getfacture(this.idfacture).subscribe(
          (data: Facture) => {
            this.facture = data;
            console.log(this.facture);
            this.amountleft=this.facture.total_amount -this.facture.paid_amount;
          },
          (error) => {
            // Handle error
            console.error('Error:', error);
          }

        );
          });
        }
    
        navtoaddpaiment(idfacture:number): void {
          console.log("idfacture="+idfacture );
          this.router.navigate(['/admin/addpaiment'], { queryParams: { id: idfacture} });
        }

        generatePdf() {
          const elementToPrint = document.getElementById('content');
          if (elementToPrint) {
            
            html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
              const pdf = new jspdf.jsPDF();
              pdf.addImage(canvas.toDataURL('image/png'),'PNG', 0, 0 , 430,310);
              pdf.setFontSize(12);
              pdf.save('myfile.pdf');
            });
          } else {
            console.error("Element with ID 'content' not found.");
            
          }


        }
}
