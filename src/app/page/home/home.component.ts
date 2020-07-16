import { TestService } from './../../test.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  constructor(private testService:TestService, private http: HttpClient){
  }
  ngOnInit(): void {
    // this.getData();
    // console.log('123', this.getData());s
    this.getNewHitPlayLists();
  }

  // getData(){
  //   return this.testService.getNewHitPlayLists();
  // }
datas=[];
   //取得每周熱門歌曲排行封面
   getNewHitPlayLists = async () => {
    const token = this.testService.token;
    // console.log(1, token);
    await this.http
      .get('https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW', {
        headers: {
          Authorization: `Bearer ` + token
        },
      })
      .subscribe({
        next(value){
          this.datas = value;
          console.log('HoemValue',value);
          console.log(' this.datas', this.datas);
        },
      });
      
  };



}
