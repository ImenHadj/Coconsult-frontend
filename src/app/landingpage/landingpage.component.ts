import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  isScrolled: boolean = false;

  @HostListener('window:scroll')
  checkScroll() {
    
    this.isScrolled = window.pageYOffset > 0;
  }

  ngOnInit() {
    this.checkScroll(); 
  }
}
