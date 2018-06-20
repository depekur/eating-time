import { Action, AnyAction } from 'redux';
import {Recipe, RecipeCategory, RecipeCountry, RecipeDestination} from './model/recipe.model';

export interface IAppState {
  isLoggedIn: boolean;
}

export const INITIAL_STATE: IAppState  = {
  isLoggedIn: false
};

export const APP_EVENTS = {
  LOGIN: 'Login',
  LOGOUT: 'Logout'
};

export function rootReducer(state: IAppState, action: AnyAction) {
  switch (action.type) {
    case APP_EVENTS.LOGIN:
      return assign(state, {
        isLoggedIn: true
      });

    case APP_EVENTS.LOGOUT:
      return INITIAL_STATE;

    default: return state;
  }
}

function assign(state: IAppState, changedValuesObject: any) {
  return Object.assign({}, state, changedValuesObject);
}
