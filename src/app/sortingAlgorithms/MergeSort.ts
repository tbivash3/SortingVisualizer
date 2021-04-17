import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sortType } from '../state/sort.actions';

@Injectable({ providedIn: 'root' })
export class MergeSort {
  constructor(private store: Store<{ sort: number[] }>) {}

  data: number[] = [];

  async sort(items: number[]): Promise<number[]> {
    var halfLength = Math.ceil(items.length / 2);
    var low = items.slice(0, halfLength);
    var high = items.slice(halfLength);
    if (halfLength > 1) {
      await this.sort(low).then((data) => {
        low = data;
      });
      await this.sort(high).then((data) => {
        high = data;
      });
    }
    const sorted = this.combine(low, high);
    console.log(sorted);
    this.store.dispatch(sortType({ data: [...sorted] }));
    await new Promise((r) => setTimeout(r, 100));

    return new Promise((res, rej) => {
      res(sorted);
    });
  }

  combine(low: number[], high: number[]): number[] {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined: number[] = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
      var lowItem = low[indexLow];
      var highItem = high[indexHigh];
      if (lowItem !== undefined) {
        if (highItem === undefined) {
          combined.push(lowItem);
          indexLow++;
        } else {
          if (lowItem <= highItem) {
            combined.push(lowItem);
            indexLow++;
          } else {
            combined.push(highItem);
            indexHigh++;
          }
        }
      } else {
        if (highItem !== undefined) {
          combined.push(highItem);
          indexHigh++;
        }
      }
    }
    return combined;
  }
}
