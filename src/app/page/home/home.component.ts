import { TestService } from './../../test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private testService:TestService){

  }
  ngOnInit(): void {
    this.getData();
    console.log('123', this.getData());

  }

  getData(){
    this.testService.getNewHitPlayLists();
  }



}
