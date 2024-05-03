import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceNoteService { 
  readonly URL = "http://localhost:8090/Note";

  constructor(private http:HttpClient) { }
  getall(){
    return this.http.get<Note[]>(this.URL+"/retrieveAll");
  }

  removeNote(id: number) {
    return this.http.delete(this.URL + "/deleteNote/" + id);

  }

  addNote(p:number,employee: Note){
    return this.http.post<number>(`${this.URL}/addNote/${p}`, employee);
  }
  addPerfermance(id:number){
    return this.http.post<number>(`${this.URL}/addPerfermance/${id}`,null);
  }
  updateNote(id: number, updatedemployee: Note){
    return this.http.put<Note>(`${this.URL}/updateNote/`+id, updatedemployee);
  }


  getNote(id: number){
    return this.http.get<Note>(this.URL+"/getNote/" + id);
  }
  getNotesByEmp(id: number){
    return this.http.get<Note[]>(this.URL+"/getNotes/" + id);
  }
  getUsernameById(id: number){
    return this.http.get<any>(this.URL+"/getUsername/" + id);
  }
  getUserByIdEmpl(id: number){
    return this.http.get<any>(this.URL+"/getUserByIdEmpl/" + id);
  }
}
