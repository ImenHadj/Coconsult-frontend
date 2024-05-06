import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  URL = "http://localhost:8090/stock";

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.URL+"/retrieve-all-stocks");
  }
  removeStock(id: number): Observable<any> {
    return this.http.delete(this.URL + "/removeStock/" + id);

  }
  addStock(resource: Stock): Observable<number> {
    return this.http.post<number>(`${this.URL}/add-stock`, resource);
  }

  updateStock(resource: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.URL}/update-stock`, resource);
  }

  retrieveStock(id: number){
    return this.http.get(this.URL+"/retrieve-stock/"+id);
  }

  getQualityTrend(): Observable<Object[]> {
    return this.http.get<Object[]>(this.URL + "/quality-trend");
  }
  

}
