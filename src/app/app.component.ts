import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public imagePath;
  imgURL: any;
  allArray : any=[];

  constructor(private http: HttpClient, private service: ImageService){

  }
 
  preview(files) {
    
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      console.log(reader.result);
      this.imgURL = reader.result; 
      var obj ={"name":files[0].name,"url":reader.result};
     
      this.saveImage(obj)
    }
  }

  saveImage(obj){
    this.service.storeImage(obj).subscribe((res)=>{
      this.service.getAllImages().subscribe((res)=>{
        console.log("response",res);
        this.allArray = res;
        console.log("array",this.allArray)
        this.allArray.unshift( this.allArray.pop())
        console.log("array",this.allArray)
        
      },
      (error)=>{
        alert("Bad Gateway");
      });
  },
  (error)=>{
    alert("Bad Gateway");
  });
  }

  ngOnInit(){
    this.service.getAllImages().subscribe((res)=>{
      console.log("response",res);
      this.allArray = res;  
    },
    (error)=>{
      alert("Bad Gateway");
    });
  }
}