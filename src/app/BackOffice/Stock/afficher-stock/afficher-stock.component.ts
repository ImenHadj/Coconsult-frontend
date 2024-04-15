import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-afficher-stock',
  templateUrl: './afficher-stock.component.html',
  styleUrls: ['./afficher-stock.component.css'],
  providers:[StockService]
})
export class AfficherStockComponent {
  stocks: any[] = [];

  constructor(private stockservice:StockService,
    private router: Router){}

  /*getall*/
    ngOnInit(): void {
      console.log("onit.......................");
      this.stockservice.getStocks().subscribe((datas)=>{
        this.stocks=datas as any[];
      })
    }
  
    /*remove*/
    removeStock(id: number): void {
      this.stockservice.removeStock(id).subscribe(() => {  
        this.stockservice.getStocks().subscribe((datas) => {
          this.stocks = datas as any[];
        });
      });
    }

    updateStock(stock: Stock): void {
      this.stockservice.updateStock(stock).subscribe(
        updateStock => {
          console.log('Stock updated successfully:', updateStock);
          this.stockservice.getStocks().subscribe((datas) => {
            this.stocks = datas as any[];
          });
        },
        error => {
          console.error('Error updating stock:', error);
        }
      );
    }
    
    editStock(stock: Stock): void {
      console.log('Edit button clicked for stock:', stock);
      this.router.navigate(['/admin/edit-stock', stock.stockID]);
    }

}
