import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  stock!: Stock;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockservice: StockService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const stockId = +id;
      if (!isNaN(stockId)) {
        this.stockservice.retrieveStock(stockId).subscribe(
          (stock: any) => {
            this.stock = stock;
          },
          (error) => {
            console.error('Error retrieving resource:', error);
          
          }
        );
      } else {
        console.error('Invalid resource ID');
     
      }
    } else {
      console.error('No resource ID provided');
   
    }
  }

  updateStock(): void {
    if (this.stock) {
      this.stockservice.updateStock(this.stock).subscribe(
        () => {
          console.log('stock updated successfully');
          this.router.navigate(['admin/stock']); 
        },
        (error) => {
          console.error('Error updating stock:', error);
        }
      );
    } else {
      console.error('stock is not defined');
    }
  }

}
