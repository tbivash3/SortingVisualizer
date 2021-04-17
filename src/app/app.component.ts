import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SortingVisualizer';

  constructor() {}

  @Input()
  randomNumberList: number[] = [];

  ngOnInit() {
    this.generateRandomNumberList();
  }

  generateRandomNumberList() {
    this.randomNumberList = Array.from({ length: 200 }, () =>
      Math.floor(Math.random() * 400)
    );
  }

  sort() {
    this.generateRandomNumberList();
  }
}
