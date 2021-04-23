import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuickSort {
  constructor() {}

  sort(sortingData: Array<number>, swapArray: number[][]) {
    this.quickSort(sortingData, 0, sortingData.length - 1, swapArray);
  }

  quickSort(
    sortingData: Array<number>,
    low: number,
    high: number,
    swapArray: number[][]
  ) {
    if (low < high) {
      let partitionIndex = this.partition(sortingData, low, high, swapArray);

      this.quickSort(sortingData, low, partitionIndex - 1, swapArray);
      this.quickSort(sortingData, partitionIndex + 1, high, swapArray);
    }
  }

  partition(
    sortingData: number[],
    low: any,
    high: any,
    swapArray: number[][]
  ): number {
    let pivot = sortingData[high];

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (sortingData[j] < pivot) {
        i++;
        this.swap(sortingData, i, j, swapArray);
      } else {
        swapArray.push([i, j, 0]);
      }
    }
    this.swap(sortingData, i + 1, high, swapArray);
    return i + 1;
  }

  swap(arr: number[], i: number, j: number, swapArray: number[][]) {
    swapArray.push([i, j, 1]);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
