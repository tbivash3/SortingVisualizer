import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InsertionSort {
  constructor() {}

  sort(data: number[], swapArray: number[][]) {
    let length = data.length;

    for (let i = 0; i < length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < length; j++) {
        swapArray.push([i, j, 0]);
        if (data[j] < data[minIndex]) {
          minIndex = j;
        }
      }

      swapArray.push([i, minIndex, 1]);
      let temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;
    }
  }
}
