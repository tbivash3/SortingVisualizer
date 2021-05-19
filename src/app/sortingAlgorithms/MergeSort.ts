import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MergeSort {
  constructor() {}
  sort(sortingData: Array<number>, swapArray: number[][]) {
    this.mergeSort(sortingData, swapArray, 0, sortingData.length - 1);
  }

  mergeSort(
    sortingData: Array<number>,
    swapArray: number[][],
    start: number,
    end: number
  ) {
    if (start == end) return;

    let mid = Math.floor((start + end) / 2);

    this.mergeSort(sortingData, swapArray, start, mid);
    this.mergeSort(sortingData, swapArray, mid + 1, end);

    this.merge(sortingData, swapArray, start, mid, end);
  }

  merge(
    sortingData: Array<number>,
    swapArray: number[][],
    start: number,
    mid: number,
    end: number
  ) {
    let tempArray = [];

    let firstIndex = start;
    let secondIndex = mid + 1;

    while (firstIndex <= mid && secondIndex <= end) {
      swapArray.push([firstIndex, secondIndex, 0]);
      if (sortingData[firstIndex] < sortingData[secondIndex]) {
        tempArray.push([sortingData[firstIndex], firstIndex]);
        firstIndex++;
      } else {
        tempArray.push([sortingData[secondIndex], secondIndex]);
        secondIndex++;
      }
    }

    while (firstIndex <= mid) {
      swapArray.push([firstIndex, -1, 0]);
      tempArray.push([sortingData[firstIndex], firstIndex]);
      firstIndex++;
    }

    while (secondIndex <= end) {
      swapArray.push([secondIndex, -1, 0]);
      tempArray.push([sortingData[secondIndex], secondIndex]);
      secondIndex++;
    }

    firstIndex = start;

    while (firstIndex <= end) {
      swapArray.push([firstIndex, tempArray[firstIndex - start][0], 1]);
      sortingData[firstIndex] = tempArray[firstIndex - start][0];
      firstIndex++;
    }
  }
}
