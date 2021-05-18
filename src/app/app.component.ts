import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  title = 'SortingVisualizer';

  constructor(
    private insertionSort: InsertionSort,
    private mergeSort: MergeSort,
    private quickSort: QuickSort,
    private heapSort: HeapSort
  ) {}

  widthOfLine: number = 0;

  maxHeightOfLine: number = 0;

  maxInputLength: number = 200;

  inputLengthValue: number = 0;

  sortSpeed: number = 10;

  sortFactor: number = 5;

  arrayLength: number = 80;

  isSorting: boolean = false;

  swapArray: number[][] = [];

  redIndex: number = -1;

  yellowIndex: number = -1;

  originalRandomNumberList: number[] = [];

  randomNumberList: number[] = [];

  sortedRandomNumberList: number[] = [];

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
   this.setMaxInputLength();
   this.updateLineWidth();
   this.updateLineHeight();
  }

  @ViewChild('lineContainer')
  lineContainer!: ElementRef;

  init() {
    this.originalRandomNumberList = Array.from(
      { length: this.arrayLength },
      () => Math.floor(Math.random() * this.maxHeightOfLine)
    );

    this.removeItemAll(this.originalRandomNumberList, 0);
    this.randomNumberList = [...this.originalRandomNumberList];

    this.sortedRandomNumberList = [...this.randomNumberList];
    this.sortedRandomNumberList.sort((a, b) => a - b);
  }

  setMaxInputLength() {
    const width = this.lineContainer.nativeElement.offsetWidth;

    const minLineWidthPlusMargin = 1 + 3;

    this.maxInputLength =  Math.floor(width / (minLineWidthPlusMargin + 1));

    console.log(this.maxInputLength);

    this.inputLengthValue = Math.floor(this.maxInputLength / 2);
  }

  updateLineWidth() {
    const width = this.lineContainer.nativeElement.offsetWidth;
    let lineWidth = Math.floor(width / this.arrayLength) - 3;

    if(lineWidth < 1) {
      lineWidth = 1;
      this.arrayLength = Math.floor(width / 4);
    }
  
    this.widthOfLine = lineWidth;
  }

  updateLineHeight() {
    const height = this.lineContainer.nativeElement.offsetHeight;
    let maxLineHeight = Math.floor(0.8 * height);
    this.maxHeightOfLine = maxLineHeight;
    this.init();
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
    this.updateLineWidth();
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
