import { Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  getImg = this.testService.getNewHitPlayLists();

  constructor(private testService: TestService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let getImg = this.testService.getNewHitPlayLists();
    console.log('getImg', getImg);
  }
}
