import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sortType } from '../state/sort.actions';

@Injectable({ providedIn: 'root' })
export class InsertionSort {
  constructor(private store: Store<{ sort: number[] }>) {}

  async sort(sortingData: number[]) {
    let length = sortingData.length;

    for (let i = 1; i < length; i++) {
      let key = sortingData[i];
      let j = i - 1;
      while (j >= 0 && sortingData[j] > key) {
        sortingData[j + 1] = sortingData[j];
        j = j - 1;
        this.store.dispatch(sortType({ data: [...sortingData] }));
        await new Promise((r) => setTimeout(r, 0));
      }

      sortingData[j + 1] = key;
    }
  }
}
