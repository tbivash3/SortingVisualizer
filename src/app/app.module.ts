import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { sortReducer } from './state/sort.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot({ sort: sortReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
