import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {

  stockForm!: FormGroup;

  constructor(private fb: FormBuilder, private stockservice: StockService) {
    this.createForm();
  }

  createForm(): void {
    this.stockForm = this.fb.group({
      quantity: ['', Validators.required],
      location: ['', Validators.required],
      replenishmentAlert: ['', Validators.required],
      entryDate: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      quality: ['', Validators.required],
      pourcentageDefauts: ['', Validators.required],
      categorieStock: ['', Validators.required]
      
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      const stockData: Stock = this.stockForm.value;
      this.stockservice.addStock(stockData).subscribe(
        (stockId) => {
          console.log('stock added successfully with ID:', stockId);
          
        },
        (error) => {
          console.error('Error adding stock:', error);
        }
      );
    }
  }
}
