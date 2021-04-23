import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { InsertionSort } from './sortingAlgorithms/InsertionSort';
import { MergeSort } from './sortingAlgorithms/MergeSort';
import { QuickSort } from './sortingAlgorithms/QuickSort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SortingVisualizer';

  constructor(
    private insertionSort: InsertionSort,
    private mergeSort: MergeSort,
    private quickSort: QuickSort
  ) {}

  sortSpeed: number = 10;

  isSorting: boolean = false;

  swapArray: number[][] = [];

  redIndex: number = -1;

  yellowIndex: number = -1;

  originalRandomNumberList: number[] = [];

  randomNumberList: number[] = [];

  sortedRandomNumberList: number[] = [];

  ngOnInit() {
    this.originalRandomNumberList = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * 200)
    );
    this.randomNumberList = [...this.originalRandomNumberList];

    this.sortedRandomNumberList = [...this.randomNumberList];
    this.sortedRandomNumberList.sort((a, b) => a - b);
  }

  sortInsertion() {
    this.isSorting = true;
    this.swapArray = [];
    this.randomNumberList = [...this.originalRandomNumberList];
    this.insertionSort.sort([...this.randomNumberList], this.swapArray);
    this.animate();
  }

  compare(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  sortMerge() {
    this.isSorting = true;
    this.swapArray = [];
    this.randomNumberList = [...this.originalRandomNumberList];
    this.mergeSort.sort([...this.randomNumberList], this.swapArray);
    this.animateMergeSort();
  }

  sortQuick() {
    this.isSorting = true;
    this.swapArray = [];
    this.randomNumberList = [...this.originalRandomNumberList];
    this.quickSort.sort([...this.randomNumberList], this.swapArray);
    this.animate();
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
    this.isSorting = false;
  }

  async animateMergeSort() {
    for (let i = 0; i < this.swapArray.length; i++) {
      let swapPosition = this.swapArray[i];
      this.redIndex = swapPosition[0];

      await new Promise((r) => setTimeout(r, this.sortSpeed));

      this.randomNumberList[swapPosition[0]] = swapPosition[1];

      await new Promise((r) => setTimeout(r, this.sortSpeed));
    }

    this.redIndex = -1;
    this.isSorting = false;
  }
}
