import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { eventListeners } from '@popperjs/core';
import { Observable } from 'rxjs';
import { autoLogin, autoLogout } from 'src/app/auth/state/auth.actions';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$!: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  logout(event: Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
