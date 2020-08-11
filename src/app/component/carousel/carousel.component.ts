import { Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  token = this.testService.token;
  playlistCategories: any[] = [];
  featuredPlaylist: any[] = [];

  constructor(private testService: TestService, private http: HttpClient) {}
  ngOnInit(): void {
    this.getPlaylistCategories();
    this.getFeaturedPlaylist();
  }

  getPlaylistCategories() {
    this.http
      .get(
        'https://api.kkbox.com/v1.1/featured-playlist-categories/9XQKD8BJx595ESs_rb?territory=TW',
        {
          headers: {
            Authorization: `Bearer ` + this.token,
          },
        }
      )
      .subscribe((value) => {
        this.playlistCategories = [value];
        this.playlistCategories = this.playlistCategories[0].playlists.data;
        console.log('getPlaylistCategories:', this.playlistCategories);
      });
  }

  getFeaturedPlaylist() {
    const token = this.testService.token;
    this.http
      .get('https://api.kkbox.com/v1.1/featured-playlist-categories?territory=TW&limit=10', {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
      .subscribe((value) => {
        this.featuredPlaylist = [value];
        this.featuredPlaylist =  this.featuredPlaylist[0].data;
        console.log('getFeaturedPlaylist:', this.featuredPlaylist);
      });
  }
}
