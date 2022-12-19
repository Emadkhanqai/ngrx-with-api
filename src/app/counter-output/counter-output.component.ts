import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter: number = 0;
  sub!: Subscription;

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    this.sub = this.store.select('counter')
      .subscribe((x: any) => this.counter = x.counter);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
