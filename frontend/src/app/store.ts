import { Action, AnyAction } from 'redux';

export interface IAppState {
  isLoggedIn: boolean;
  user;
  settings;
  currentRationDishes;
  activeEating: number;
  currentDate;
}

export const INITIAL_STATE: IAppState  = {
  isLoggedIn: false,
  user: false,
  settings: false,
  currentRationDishes: false,
  activeEating: 1,
  currentDate: false
};

export const APP_EVENTS = {
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  SAVE_USER: 'save user',
  SAVE_SETTINGS: 'save settings',
  UPDATE_ACTIVE_EATING: 'update active eating',
  UPDATE_CURRENT_RATION: 'update current ration day',
  UPDATE_CURRENT_DATE: 'update current day date',
  ADD_RECIPE_TO_RATION: 'add recipe to ration',
  ADD_RECIPE_TO_RATION_2: 'add recipe to ration 2',
};

export function rootReducer(state: IAppState, action: AnyAction) {
  switch (action.type) {
    case APP_EVENTS.LOGIN:
      return assign(state, {
        isLoggedIn: true
      });

    case APP_EVENTS.LOGOUT:
      return INITIAL_STATE;

    case APP_EVENTS.SAVE_USER:
      return assign(state, {
        user: action.body
      });

    case APP_EVENTS.SAVE_SETTINGS:
      return assign(state, {
        settings: action.body
      });

    case APP_EVENTS.UPDATE_ACTIVE_EATING:
      return assign(state, {
        activeEating: action.body
      });



    case APP_EVENTS.UPDATE_CURRENT_RATION:
      return assign(state, {
        currentRationDishes: action.body.map(food => {
          return food;
        })
      });


    case APP_EVENTS.UPDATE_CURRENT_DATE:
      return assign(state, {
        currentDate: action.body
      });

    case APP_EVENTS.ADD_RECIPE_TO_RATION:
      let inMenu = false;

      state.currentRationDishes[state.activeEating-1].dishes.forEach(dish => {
        if (dish.recipeId == action.body.recipeId) {
          inMenu = true;
        }
      });

      if (!inMenu) {
        return assign(state, {
          currentRationDishes: state.currentRationDishes.map(food => {
            if (food.eatingOrder === state.activeEating) {
              return Object.assign({}, food, {dishes: [...food.dishes, {
                dishOrder: food.dishes.length + 1,
                recipeId: action.body.recipeId,
                recipeTitle: action.body.recipeTitle
              }]});
            } else {
              return food;
            }
          })
        });
      } else {
        return state;
      }

    default: return state;
  }
}

function assign(state: IAppState, changedValuesObject: any) {
  return Object.assign({}, state, changedValuesObject);
}
