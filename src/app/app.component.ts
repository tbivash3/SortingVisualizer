import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { InsertionSort } from './sortingAlgorithms/InsertionSort';
import { MergeSort } from './sortingAlgorithms/MergeSort';
import { sortType } from './state/sort.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SortingVisualizer';

  constructor(
    private store: Store<{ sort: number[] }>,
    private insertionSort: InsertionSort,
    private mergeSort: MergeSort
  ) {}

  randomNumberList: number[] = [];

  randomNumberList$: Observable<number[]> = new Observable<number[]>();

  sortType$: Observable<string> = new Observable<string>();

  ngOnInit() {
    this.generateRandomNumberList();
    this.randomNumberList$ = this.store.select('sort');
    this.randomNumberList = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 400)
    );
    this.store.dispatch(sortType({ data: this.randomNumberList }));
  }

  generateRandomNumberList() {}

  sortInsertion() {
    this.insertionSort.sort([...this.randomNumberList]);
  }

  sortMerge() {
    this.mergeSort.sort([...this.randomNumberList]);
  }
}
