import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { HttpClient } from '@angular/common/http';
import { DownloadfileService } from './downloadfile.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  imports: [MatCardModule,MatFormFieldModule,HttpClientModule,CommonModule,FormsModule,MatButtonModule,MatInputModule],
  providers:[HttpClient,DownloadfileService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  videoUrl:string = '';
  format:string ="video";

  constructor(private http:HttpClient, private fileService:DownloadfileService) { }
  download(){


    this.fileService.downloadFile(this.videoUrl,this.format).subscribe(res=>{
      if(res.body){
        const blob = new Blob([res.body], { type: res.headers.get('content-type') || 'application/octet-stream'  });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        a.click();
        window.URL.revokeObjectURL(url);

      }else{
        alert("No Data Recieved, Please check Url")
      }

    },
    error=>{
      alert("Error Occured, Please check Url "+error)
    }
    );

  }
}
