import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getChannelName, getCounter } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  channelName!: string;

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    this.store.select(getChannelName).subscribe((data: any) => this.channelName = data);
  }

  changeName() {
    this.store.dispatch(changeChannelName());
  }

  onAdd() {
    this.store.dispatch(customIncrement({ value: this.value }));
  }
}
