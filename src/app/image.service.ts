import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  storeImage(image){
    return this.http.post("http://localhost:3000/images",image);
  }

  getAllImages(){
    return this.http.get("http://localhost:3000/images")
  }
}
