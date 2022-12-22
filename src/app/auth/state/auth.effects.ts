import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner, setSuccessMessage } from "src/app/store/shared/shared.action";
import { autoLogin, loginStart, loginSuccess, signUpStart, signUpSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) {
  }

  login$ = createEffect(() => {
    return this.action$
      .pipe(
        ofType(loginStart),
        exhaustMap((action: any) => {
          return this.authService.login(action.email, action.password)
            .pipe(
              map((data: any) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.store.dispatch(setSuccessMessage({ message: 'User logged In Successfully' }));
                this.store.dispatch(setErrorMessage({ message: '' }));
                const user = this.authService.format(data);
                this.authService.setUserInLocalStorage(user);
                return loginSuccess({ user });
              }),
              catchError((error) => {
                this.store.dispatch(setSuccessMessage({ message: '' }));
                this.store.dispatch(setLoadingSpinner({ status: false }));
                const err = this.authService.getErrorMessage(error.error.error.message)
                return of(setErrorMessage({ message: err }));
              }))
        }))
  })

  // dispatch: false means don't return anything
  loginRedirect$ = createEffect(() => {
    return this.action$.pipe(ofType(...[loginSuccess, signUpSuccess]), tap(action => {
      this.store.dispatch(setErrorMessage({ message: '' }));
      this.router.navigate(['/'])
    }))
  }, { dispatch: false })

  signup$ = createEffect(() => {
    return this.action$
      .pipe(
        ofType(signUpStart),
        exhaustMap((action: any) => {
          return this.authService.signup(action.email, action.password)
            .pipe(
              map((data: any) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.store.dispatch(setSuccessMessage({ message: 'User Registered Successfully' }));
                this.store.dispatch(setErrorMessage({ message: '' }));
                const user = this.authService.format(data);
                this.authService.setUserInLocalStorage(user);
                return signUpSuccess({ user });
              }),
              catchError((error) => {
                this.store.dispatch(setSuccessMessage({ message: '' }));
                this.store.dispatch(setLoadingSpinner({ status: false }));
                const err = this.authService.getErrorMessage(error.error.error.message)
                return of(setErrorMessage({ message: err }));
              }))
        }))
  })

  autoLogin$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(autoLogin),
        map((action) => {
          const user = this.authService.getUserFromLocalStorage();
          console.log(user);
        })
      );
    },
    { dispatch: false });
}
