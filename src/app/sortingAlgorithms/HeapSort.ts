import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeapSort {
  constructor() {}

  sort(sortingData: Array<number>, swapArray: number[][]) {
    let startIndex = Math.floor(sortingData.length / 2) - 1;

    for (let i = startIndex; i >= 0; i--) {
      this.maxHeapify(sortingData, sortingData.length, i, swapArray);
    }

    this.heapSort(sortingData, swapArray);
  }

  maxHeapify(arr: Array<number>, n: number, i: number, swapArray: number[][]) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;

    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
      swapArray.push([i, largest, 1]);
      let swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      this.maxHeapify(arr, n, largest, swapArray);
    }
  }

  heapSort(arr: Array<number>, swapArray: number[][]) {
    for (let i = arr.length - 1; i > 0; i--) {
      swapArray.push([0, i, 1]);
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      this.maxHeapify(arr, i, 0, swapArray);
    }
  }
}
