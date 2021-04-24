import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { InsertionSort } from './sortingAlgorithms/InsertionSort';
import { MergeSort } from './sortingAlgorithms/MergeSort';
import { QuickSort } from './sortingAlgorithms/QuickSort';
import { HeapSort } from './sortingAlgorithms/HeapSort';

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
    private quickSort: QuickSort,
    private heapSort: HeapSort
  ) {}

  sortSpeed: number = 10;

  sortFactor: number = 5;

  arrayLength: number = 60;

  isSorting: boolean = false;

  swapArray: number[][] = [];

  redIndex: number = -1;

  yellowIndex: number = -1;

  originalRandomNumberList: number[] = [];

  randomNumberList: number[] = [];

  sortedRandomNumberList: number[] = [];

  ngOnInit() {
    this.init();
  }

  init() {
    this.originalRandomNumberList = Array.from(
      { length: this.arrayLength },
      () => Math.floor(Math.random() * 200)
    );

    this.removeItemAll(this.originalRandomNumberList, 0);
    this.randomNumberList = [...this.originalRandomNumberList];

    this.sortedRandomNumberList = [...this.randomNumberList];
    this.sortedRandomNumberList.sort((a, b) => a - b);
  }

  removeItemAll(arr: number[], value: number) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  setArrLength(length: string) {
    this.arrayLength = Number(length);
    this.init();
  }

  setSortSpeed(speed: string) {
    this.sortFactor = 10 / Number(speed);
  }

  resetData() {
    this.isSorting = true;
    this.swapArray = [];
    this.randomNumberList = [...this.originalRandomNumberList];
  }

  sortInsertion() {
    this.resetData();
    this.insertionSort.sort([...this.randomNumberList], this.swapArray);
    this.animateSwap();
  }

  sortMerge() {
    this.resetData();
    this.mergeSort.sort([...this.randomNumberList], this.swapArray);
    this.animateMergeRoutine();
  }

  sortQuick() {
    this.resetData();
    this.quickSort.sort([...this.randomNumberList], this.swapArray);
    this.animateSwap();
  }

  sortHeap() {
    this.resetData();
    this.heapSort.sort([...this.randomNumberList], this.swapArray);
    this.animateSwap();
  }

  async animateSwap() {
    for (let i = 0; i < this.swapArray.length; i++) {
      let swapPosition = this.swapArray[i];

      this.redIndex = swapPosition[0];
      this.yellowIndex = swapPosition[1];

      await new Promise((r) => setTimeout(r, this.sortFactor * this.sortSpeed));

      if (swapPosition[2] == 1) {
        let temp = this.randomNumberList[swapPosition[0]];
        this.randomNumberList[swapPosition[0]] = this.randomNumberList[
          swapPosition[1]
        ];
        this.randomNumberList[swapPosition[1]] = temp;

        await new Promise((r) =>
          setTimeout(r, this.sortFactor * this.sortSpeed)
        );
      }
    }
    this.redIndex = -1;
    this.yellowIndex = -1;
    this.isSorting = false;
  }

  async animateMergeRoutine() {
    for (let i = 0; i < this.swapArray.length; i++) {
      let swapPosition = this.swapArray[i];

      if (swapPosition[2] == 0) {
        this.redIndex = swapPosition[0];
        this.yellowIndex = swapPosition[1];
        await new Promise((r) =>
          setTimeout(r, this.sortFactor * this.sortSpeed)
        );
      } else {
        this.randomNumberList[swapPosition[0]] = swapPosition[1];
        await new Promise((r) =>
          setTimeout(r, this.sortFactor * this.sortSpeed)
        );
      }
    }
    this.redIndex = -1;
    this.yellowIndex = -1;
    this.isSorting = false;
  }
}
