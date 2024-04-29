import { Component ,inject } from '@angular/core';
import { ServiceclientService } from '../serviceclient.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDatepickerModule, NgbDatepicker,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-addcontrat',
  templateUrl: './addcontrat.component.html',
  styleUrls: ['./addcontrat.component.css']
})
export class AddcontratComponent implements OnInit{
  

  id: number | undefined ;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private clientservice: ServiceclientService) {}
  ContratForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      
    });
    
  }
  onSubmit(): void {
    if (this.ContratForm.valid) {
      
      const contrat = this.ContratForm.value;
      this.clientservice.addContract(contrat,this.id!).subscribe(
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
  private initForm(): void {
    this.ContratForm = this.fb.group({
      contractDate: ['', Validators.required],
      startDate: ['', Validators.required],
      item_description: ['', Validators.required],
      endDate: ['', Validators.required],
      version: ['', Validators.required],
      payment_terms: ['', Validators.required],
      contract_status: ['', Validators.required],
      typeContrat: ['', Validators.required],
    });}
    

}
