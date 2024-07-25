import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css',
})
export class SplashScreenComponent implements OnInit {
  showImage = true;

  ngOnInit() {
    setTimeout(() => {
      this.showImage = false;
    }, 2000); // 3000 ms = 2 seconds
  }
}
