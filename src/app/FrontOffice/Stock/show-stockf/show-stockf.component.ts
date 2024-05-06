import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/app/BackOffice/Stock/stock.model';
import { StockService } from 'src/app/BackOffice/Stock/stock.service';

@Component({
  selector: 'app-show-stockf',
  templateUrl: './show-stockf.component.html',
  styleUrls: ['./show-stockf.component.css']
})
export class ShowStockfComponent {

  stocks: any[] = [];
  p: number = 1;

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
      this.router.navigate(['accueil/editStock', stock.stockID]);
    }

}
