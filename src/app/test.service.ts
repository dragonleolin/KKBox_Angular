import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, ReplaySubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HomeData } from './HomeData';

@Injectable({
  providedIn: 'root',
})
export class TestService {
 
  private getHomeData:HomeData ={
    id: '',
    title: '',
  }
  albumId$ = new BehaviorSubject<HomeData>(this.getHomeData);

  constructor(private http: HttpClient) {}

  setAlbumId(id: string, title:string) {
    const HomeData ={
      id: id,
      title: title
    }
    console.log('已設定', HomeData);
    this.albumId$.next(HomeData);

  }

  

  send() {
    this.http.get('http://127.0.0.1:3001/get').subscribe({
      next(value) {
        console.log('value', value);
      },
      error(error) {
        console.log('error', error);
      },
      complete() {
        console.log('success');
      },
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
          Authorization: `Bearer ` + this.token,
        },
      })
      .subscribe({
        next(value) {
          console.log('value', value);
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