import { Component } from '@angular/core';
import { ServiceclientService } from '../serviceclient.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-editcontrat',
  templateUrl: './editcontrat.component.html',
  styleUrls: ['./editcontrat.component.css']
})
export class EditcontratComponent implements OnInit{
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
      this.clientservice.updateContrat(contrat,this.id!).subscribe(
        (idContract) => {
          console.log('contrat edited successfully with ID:', idContract);
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
      contractDate: [''],
      startDate: [''],
      currency: [''],
      endDate: [''],
      version: [''],
      payment_terms: [''],
      contract_status: [''],
      typeContrat: [''],
    });
  }
  

}
