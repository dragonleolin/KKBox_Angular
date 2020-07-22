import { Component, OnInit, Input } from '@angular/core';
import { TestService } from './../../test.service';
import { HttpClient } from '@angular/common/http';
import { RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-page',
  templateUrl: './youtube-page.component.html',
  styleUrls: ['./youtube-page.component.scss'],
})
export class YoutubePageComponent implements OnInit {
  token = this.testService.token;
  datas: any;
  YTId: any;
  youtubeUrl:string;
  getId;
  getTitle;
  urlSafe: SafeResourceUrl;
  safeUrl: any;


  constructor(
    private testService: TestService,
    private http: HttpClient,
    private route:ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.testService.albumId$.subscribe(res=>{
      this.getId = res.id;
      this.getTitle = res.title;
    });
    this.getInitData();
  }


  getInitData = () => {
    console.log('getInitData', this.getId);
    this.http
      .get(
        `https://api.kkbox.com/v1.1/charts/${this.getId}/tracks?territory=TW&offset=0&limit=50`,
        {
          headers: {
            Authorization: `Bearer ` + this.token,
          },
        }
      )
      .subscribe(async (res) => {
        this.datas = [res];
        this.datas = this.datas[0].data;
        console.log('getInitData', this.datas);
        const name:string = this.datas[0].name;
        console.log('RESname', name);
        await this.getYTData(name);
      });
  };




  getYTData(name:string){
    // youtubeKeyMain: AIzaSyCqiOvXgeO9u7AbLly294jjoZwZ3PFVKDs
    // youtubeKey: AIzaSyDqvzY_cP4_ZI5lKpnWrDWZZu6Gm2PzK74
    this.http
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCqiOvXgeO9u7AbLly294jjoZwZ3PFVKDs&part=snippet&type=video&q=${name}`
      )
      .subscribe((res) => {
        this.YTId = [res];
        console.log('res:', this.YTId);
        this.YTId = this.YTId[0].items[0].id.videoId;
        console.log('this.YTId:', this.YTId);

        // this.YTId= 'zx2rqHNC22A';
        this.youtubeUrl = `https://www.youtube.com/embed/${this.YTId}`;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl);

      });
  };
}
