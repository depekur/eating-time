export const config = {
  apiUrl: 'http://api.kitchen.loc/'
};

export const apiUrls = {
  login: `${config.apiUrl}login`,
  register: `${config.apiUrl}register`,

  userInfo: `${config.apiUrl}user`,

  filters: `${config.apiUrl}filters`,
  ingredients: `${config.apiUrl}ingredients/`,
  addRecipe: `${config.apiUrl}add-recipe`,

  file: {
    upload: `${config.apiUrl}file/upload`,
    delete: `${config.apiUrl}file/delete/`,
  },

  recipe: {
    add: `${config.apiUrl}add-recipe`,
    all: `${config.apiUrl}recipes`,
    single: `${config.apiUrl}recipe/`,
    favorite: `${config.apiUrl}favorite`
  }
};


