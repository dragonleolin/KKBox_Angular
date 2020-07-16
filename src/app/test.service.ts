import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}
  send() {
    this.http.get('http://127.0.0.1:3001/get').subscribe((data) => {
      console.log('data:', data);
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
      .subscribe(async (res) => {
        console.log(2, res);
        return res;
      });
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
