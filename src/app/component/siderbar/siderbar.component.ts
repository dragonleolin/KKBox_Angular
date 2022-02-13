import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss'],
})
export class SiderbarComponent implements OnInit {
  scroll: boolean = false;
  total = [1,2];
  animationDuration: number = 10;
  active = 0;
  preActive = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
  }
  @HostListener('window:scroll') onElementScroll($event: Event): void {
    //console.log('scroll=' + window.scrollY);
    if (window.scrollY > 0) {
      this.scroll = true;
    }
    if (window.scrollY == 0) {
      this.scroll = false;
    }
  }

  img = (n: number) => {
    return {
      backgroundImage: `url(https://picsum.photos/1920/1200?random=1${n})`,
      animationDuration: ` ${this.animationDuration}s`,
      animationDelay: `${((n - 1) * this.animationDuration) / 2}s`,
    };
  };


  getBlueClass = () => {
    if (this.scroll) {
      return 'kv scroll';
    } else {
      return 'kv';
    }
  };
}
