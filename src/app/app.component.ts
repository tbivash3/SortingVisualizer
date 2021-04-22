import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { InsertionSort } from './sortingAlgorithms/InsertionSort';
import { MergeSort } from './sortingAlgorithms/MergeSort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SortingVisualizer';

  constructor(
    private insertionSort: InsertionSort,
    private mergeSort: MergeSort
  ) {}

  sortSpeed: number = 10;

  randomNumberList: number[] = [];

  swapArray: number[][] = [];

  redIndex: number = -1;

  yellowIndex: number = -1;

  ngOnInit() {
    this.randomNumberList = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * 200)
    );
  }

  sortInsertion() {
    this.swapArray = [];
    this.insertionSort.sort([...this.randomNumberList], this.swapArray);
    this.animate();
  }

  sortMerge() {
    this.swapArray = [];
    this.mergeSort.sort([...this.randomNumberList], this.swapArray);
    this.animateMergeSort();
  }

  async animate() {
    for (let i = 0; i < this.swapArray.length; i++) {
      let swapPosition = this.swapArray[i];

      this.redIndex = swapPosition[0];
      this.yellowIndex = swapPosition[1];

      await new Promise((r) => setTimeout(r, this.sortSpeed));

      if (swapPosition[2] == 1) {
        let temp = this.randomNumberList[swapPosition[0]];
        this.randomNumberList[swapPosition[0]] = this.randomNumberList[
          swapPosition[1]
        ];
        this.randomNumberList[swapPosition[1]] = temp;

        await new Promise((r) => setTimeout(r, this.sortSpeed * 5));
      }
    }
    this.redIndex = -1;
    this.yellowIndex = -1;
  }

  async animateMergeSort() {
    for (let i = 0; i < this.swapArray.length; i++) {
      let swapPosition = this.swapArray[i];
      this.redIndex = swapPosition[0];
      this.randomNumberList[swapPosition[0]] = swapPosition[1];

      await new Promise((r) => setTimeout(r, this.sortSpeed));
    }

    this.redIndex = -1;
  }
}
