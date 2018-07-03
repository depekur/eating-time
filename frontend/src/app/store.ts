import { Action, AnyAction } from 'redux';
import {Recipe, RecipeCategory, RecipeCountry, RecipeDestination} from './shared/model/recipe.model';

export interface IAppState {
  isLoggedIn: boolean;
  user;
}

export const INITIAL_STATE: IAppState  = {
  isLoggedIn: false,
  user: false
};

export const APP_EVENTS = {
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  SAVE_USER: 'save user'
};

export function rootReducer(state: IAppState, action: AnyAction) {
  switch (action.type) {
    case APP_EVENTS.LOGIN:
      //console.log('APP_EVENTS.LOGIN');
      return assign(state, {
        isLoggedIn: true
      });

    case APP_EVENTS.LOGOUT:
      //console.log('APP_EVENTS.LOGOUT');
      return INITIAL_STATE;

    case APP_EVENTS.SAVE_USER:
      //console.log('APP_EVENTS.SAVE_USER');
      return assign(state, {
        user: action.body
      });

    default: return state;
  }
}

function assign(state: IAppState, changedValuesObject: any) {
  return Object.assign({}, state, changedValuesObject);
}
