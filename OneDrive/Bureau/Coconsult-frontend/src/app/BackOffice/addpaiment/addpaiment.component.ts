import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceclientService } from '../serviceclient.service';

@Component({
  selector: 'app-addpaiment',
  templateUrl: './addpaiment.component.html',
  styleUrls: ['./addpaiment.component.css']
})
export class AddpaimentComponent implements OnInit{
  Paimentform!: FormGroup;
  id: number | undefined ;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private clientService: ServiceclientService) {}

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      
    });
  }
  private initForm(): void {
    this.Paimentform = this.fb.group({
      payment_date: ['', Validators.required],
      amount: ['', Validators.required],
      typepaiment: ['', Validators.required],
    });}

    onSubmit(): void {
      if (this.Paimentform.valid) {
      
        const paiment = this.Paimentform.value;
        this.clientService.addpaiment(paiment,this.id!).subscribe(
          (idpaiement) => {
            console.log('paiment added successfully with ID:', idpaiement);
            window.location.reload();
          },
          (error) => {
            console.error('Error adding paiment:', error);
          }
        );
      }
    }

}
