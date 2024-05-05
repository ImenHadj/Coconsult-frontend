import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  imageURL = 'http://localhost:8090/cloudinary/';

  constructor(private httpClient: HttpClient) { }

  public list(){
    return this.httpClient.get<Image[]>(this.imageURL + 'list');
  }

  public uploadJustifConge(image: File,id:any){
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<any>(this.imageURL + 'uploadJustifConge/'+id, formData);
  }
  public upload(image: File,id:any){
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<any>(this.imageURL + 'upload/'+id, formData);
  }

  public delete(id: any){
    return this.httpClient.delete<any>(this.imageURL + `delete/${id}`);
  }

}
