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

  albumId;
  datas: any[] = [];
  title;
  playlistCategories: any[] = [];

  constructor(
    private testService: TestService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.getNewHitPlayLists();
    this.testService.getNewHitPlayLists();
    console.log('home:',this.testService.getNewHitPlayLists());
    
  }


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


  getPlaylistCategories(){
    const token = this.testService.token;
    this.http
      .get('https://api.kkbox.com/v1.1/featured-playlist-categories/9XQKD8BJx595ESs_rb?territory=TW', {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .subscribe((value) => {
        this.playlistCategories = [value];
        this.playlistCategories = this.playlistCategories[0].playlists.data;
          console.log('getPlaylistCategories:', this.playlistCategories);

        });
  }


}
