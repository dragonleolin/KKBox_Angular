import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor(private http: HttpClient
    ){

  }
  send(){
    this.http.get('http://127.0.0.1:3001/get').subscribe(data=>{
      console.log('data:',data);

    });
  }
}
