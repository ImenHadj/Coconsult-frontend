import { Component } from '@angular/core';
import { ServiceclientService } from '../serviceclient.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit{

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private clientservice:ServiceclientService){}
  id: number | undefined ;
  clientForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      
    });
    
  }
  onSubmit(): void {
    if (this.clientForm.valid) {
      
      const client = this.clientForm.value;
      this.clientservice.updateClient(client,this.id!).subscribe(
        (idContract) => {
          console.log('client edited successfully with ID:', idContract);
          window.location.reload();
        },
        (error) => {
          console.error('Error editing client:', error);
        }
      );
    }
  }
  private initForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      companyAddress: ['', Validators.required],
      // Add other form controls as needed
    });}
}
