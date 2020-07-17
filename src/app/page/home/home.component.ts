import { TestService } from './../../test.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private testService: TestService, private http: HttpClient) {}
  ngOnInit(): void {
    // this.getData();
    // console.log('123', this.getData());
    this.getNewHitPlayLists();

    console.log('test:', this.datas);
    console.log('test2:', this.Heros);
  }

  // getData(){
  //   return this.testService.getNewHitPlayLists();
  // }

  datas: any[] = [];

  Heros = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
  ];

  //取得每周熱門歌曲排行封面
  getNewHitPlayLists = () => {
    const token = this.testService.token;
    // console.log(1, token);
    this.http
      .get('https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW', {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .subscribe({
        next(value) {
          this.datas = [value];
          this.datas = this.datas[0].data;
          console.log('HoemValue', typeof value);
          console.log(' this.datas', this.datas[0].data);
          console.log(' this.datas1', this.datas);
        },error(error){
          console.log('error',error);
        },
        complete(){
          console.log('success',this.datas);
        }
      });
  }
}
