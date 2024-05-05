import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceclientService } from "../serviceclient.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Facture } from '../facture.model';
import { Client } from '../client.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class FactureComponent implements OnInit{
  isFormOpen: boolean = false;
  Factures: Facture[] = [];
  idcontrat: number | undefined;
  idclient: number | undefined;
  factureForm!: FormGroup;
  totalprix:number| undefined;
  client!: Client;
  pageSize: number = 2;
  pagedFactures: Facture[] = [];

  constructor(private route: ActivatedRoute,private router: Router,private fb: FormBuilder, private clientservice:ServiceclientService){}
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild('factureFormElement') factureFormElement: ElementRef | undefined;

 ngOnInit(): void {
  this.initForm();

    this.route.queryParams.subscribe(params => {
      this.totalprix = +params['total'];
      this.idcontrat = +params['id'];
      this.idclient = +params['idcli'];
      if (this.idcontrat && this.idclient) {
        this.clientservice.getallfactures(this.idclient,this.idcontrat).subscribe((datas) => {
          this.Factures = datas as any[];
          this.onPageChange({
            pageIndex: 0, pageSize: this.pageSize,
            length: 0
          });
         
        });
      }
    });
    
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.pagedFactures = this.Factures.slice(startIndex, startIndex + event.pageSize);
}

  

  removefacture(id: number): void {
    this.clientservice.removefacture(id).subscribe(() => {  
      this.route.queryParams.subscribe(params => {
        this.idcontrat = +params['id'];
        this.idclient = +params['idcli'];
        console.log(this.idcontrat, this.idclient );
        if (this.idcontrat && this.idclient) {
          this.clientservice.getallfactures(this.idclient,this.idcontrat).subscribe((datas) => {
            console.log(datas);
            this.Factures = datas as any[];
            console.log(this.Factures);
          });
        }
      });
    });
  }
  openform() {
    this.isFormOpen = true;
    this.scrollToForm();
  }

  scrollToForm() {
    if (this.factureFormElement) {
      // Use nativeElement to access the actual DOM element
      this.factureFormElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  private initForm() {
    this.factureForm = this.fb.group({
      designation: ['', Validators.required],
      
      invoice_number: [null, Validators.required],
      facture_date: [null, Validators.required],
      due_date: [null, Validators.required],
      total_amount: [null, Validators.required],
      
      notes: [''],
      milestone_description: [''],

    });
  }
  onSubmit(): void {
    if (this.factureForm.valid) {
      
      const facture = this.factureForm.value;
      this.clientservice.addfacture(facture,this.idclient!,this.idcontrat!).subscribe(
        (idContract) => {
          console.log('contrat added successfully with ID:', idContract);
          window.location.reload();
        },
        (error) => {
          console.error('Error adding contrat:', error);
        }
      );
    }
  }


  navtoaddpaiment(idfacture:number): void {
    console.log("idfacture="+idfacture );
    this.router.navigate(['/admin/addpaiment'], { queryParams: { id: idfacture} });
  }
  navtodetails(idfacture:number):void{
    console.log("factoura"+idfacture);
    this.router.navigate(['/admin/detailfacture'], { queryParams: { id: idfacture} });
  }

}
