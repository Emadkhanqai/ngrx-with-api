import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

// LOGIN
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const LOGIN_FAILED = '[auth page] login failed';
export const AUTO_LOGIN = '[auth page] auto login';
export const LOGOUT = '[auth page] logout';

export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string }>())
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User | null; redirect: boolean }>()
);
export const signUpStart = createAction(SIGNUP_START, props<{ email: string, password: string }>())
export const signUpSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User | null; redirect: boolean}>());
export const autoLogin = createAction(AUTO_LOGIN);
export const autoLogout = createAction(LOGOUT);
