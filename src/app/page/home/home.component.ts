import { TestService } from './../../test.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private testService: TestService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    // this.getData();
    // console.log('123', this.getData());
    this.getNewHitPlayLists();
  }

  // getData(){
  //   return this.testService.getNewHitPlayLists();
  // }

  albumId;

  datas: any[] = [];

  onClickalbumId(id: string, title:string) {
    this.testService.setAlbumId(id, title);
    this.router.navigateByUrl('/youtubePage');
    //利用網址列的方式來存ID
    // this.router.navigateByUrl('/youtubePage/?id=' + id);
  }

  onClickToPlayWidgets(id: string, title:string) {
    this.testService.setAlbumId(id, title);
    this.router.navigateByUrl('/playerWidgets');
  }

  //取得每周熱門歌曲排行封面
  getNewHitPlayLists = async () => {
    const token = this.testService.token;
    this.http
      .get('https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW', {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .subscribe((value) => {
        this.datas = [value];
        this.datas = this.datas[0].data;
        console.log(' this.datas1', this.datas);
      });
  };
}
