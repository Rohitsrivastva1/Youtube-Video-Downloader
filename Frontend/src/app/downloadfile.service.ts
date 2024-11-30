import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DownloadfileService {

  constructor(private http: HttpClient) { }

  downloadFile(url: string, format: string) {
      
    const body = new URLSearchParams();
    body.set('url', url);
    body.set('format_type', format);

    const header = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:8000/download', body.toString(), { headers: header, observe:"response",responseType: 'blob' });

  }
}
