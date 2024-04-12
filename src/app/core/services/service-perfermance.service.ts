import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicePerfermanceService {

  readonly URL = "http://localhost:8090/perfomanceEmpl";

  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Performance[]>(this.URL+"/getAllPerformances");
  }

  removePerformance(id: number) {
    return this.http.delete(this.URL + "/deleteNote/" + id);

  }

  addPerformance(employee: Performance){
    return this.http.post<number>(`${this.URL}/addperfomanceEmpl`, employee);
  }
  updatePerformance(id: number, updatedemployee: Performance){
    return this.http.put<Performance>(`${this.URL}/updatePerformance/`+id, updatedemployee);
  }


  getPerformance(id: number){
    return this.http.get<Performance>(this.URL+"/getPerformanceById/" + id);
  }
}
