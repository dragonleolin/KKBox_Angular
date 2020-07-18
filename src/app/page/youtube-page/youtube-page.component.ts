import { Component, OnInit } from '@angular/core';
import { TestService } from './../../test.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-youtube-page',
  templateUrl: './youtube-page.component.html',
  styleUrls: ['./youtube-page.component.scss']
})
export class YoutubePageComponent implements OnInit {

  token= this.testService.token;
  datas: any;
  YTId: any;
  youtube='https://www.youtube.com/embed/';
  constructor(private testService: TestService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getInitData();
  }


  
  getInitData = () =>{
    console.log('token:', this.token);
    
    this.http.get('https://api.kkbox.com/v1.1/charts/DZni8m29ciOFbRxTJq/tracks?territory=TW&offset=0&limit=50',
    {
      headers: {
        Authorization: `Bearer `  + this.token,
      }
    }).subscribe((res)=>{
      this.datas =[res];
      this.datas = this.datas[0].data;
      console.log('res:', res);
      // this.getYTData();
      console.log('getInitData', this.datas);
    })
  }


  // getYTData = ()=>{
  //   let name = "DJ Khaled (DJ卡利)";
  //   // youtubeKeyMain: AIzaSyCqiOvXgeO9u7AbLly294jjoZwZ3PFVKDs
  //   // youtubeKey: AIzaSyDqvzY_cP4_ZI5lKpnWrDWZZu6Gm2PzK74
  //   this.http.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDqvzY_cP4_ZI5lKpnWrDWZZu6Gm2PzK74&part=snippet&type=video&q=${name}`
  //   ).subscribe((res)=>{
  //     this.YTId = [res];
  //     console.log('YTData:', this.YTId);
      

  //   })
  // }

}
