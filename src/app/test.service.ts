import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, ReplaySubject  } from 'rxjs';
import{BehaviorSubject }from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getId:string;
  albumId$ = new BehaviorSubject<string>(this.getId);
  // albumId$ = new Subject();

  
  getAlbumId(id:string){
    console.log('getAlbumId:', id);
      this.getId = id;
      
      console.log('getAlbumId2:', this.getId);
      this.albumId$.next(this.getId);
  }

  send() {
    this.http.get('http://127.0.0.1:3001/get').subscribe({
      next(value){
        console.log('value',value);
      },
      error(error){
        console.log('error',error);
      },
      complete(){
        console.log('success');
      }
    });
  }

  getToken() {
    this.http.get('http://127.0.0.1:3001/oauth2/token').subscribe((res) => {
      console.log('getToken:', res);
    });
  }

  // token = 'a_V9cDy4Fm6yudjCRHN2cg==';
  token = 'EyjKXVYDMXO3L_jnrCIsfQ==';


  //取得每周熱門歌曲排行封面
  getNewHitPlayLists = async () => {
    console.log(1, this.token);
    await this.http
      .get('https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW', {
        headers: {
          Authorization: `Bearer ` + this.token
        },
      })
      .subscribe({
        next(value){
          console.log('value',value);
        },
      });
      console.log('3');
      
  };

  getYTData = () => {
    this.http
      .get(
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAta-bAGIsoa8etmOR7LKYprMhJdSNoRPE&part=snippet&type=video&q=[search]',
        {
          headers: {
            Authorization: `Bearer ` + this.token,
          },
        }
      )
      .subscribe((res) => {
        console.log(5, res);
        
      });
  };
}
