import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { loginStart, loginSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: AuthService) {
  }

  login$ = createEffect(() => {
    return this.action$
      .pipe(
        ofType(loginStart),
        exhaustMap((action: any) => {
          return this.authService.login(action.email, action.password)
            .pipe(
              map((data: any) => {
                const user = this.authService.format(data);
                return loginSuccess({ user });
              }))
        }))
  })
}
