export const CONFIG = {
  apiUrl: 'http://api.kitchen.loc/',
  defaultEatingCount: 5,
  siteName: '',
  siteTitle: ''
};

const apiUrl = 'http://api.kitchen.loc/';

export const apiUrls = {
  login: `${apiUrl}login`,
  register: `${apiUrl}register`,

  userInfo: `${apiUrl}user`,

  filters: `${apiUrl}filters`,
  ingredients: `${apiUrl}ingredients/`,
  addRecipe: `${apiUrl}add-recipe`,

  file: {
    upload: `${apiUrl}file/upload`,
    delete: `${apiUrl}file/delete/`,
  },

  recipe: {
    add: `${apiUrl}add-recipe`,
    all: `${apiUrl}recipes`,
    single: `${apiUrl}recipe/`,
    favorite: `${apiUrl}favorite`
  },

  ration: {
    get: `${apiUrl}ration`,
    getInterval: `${apiUrl}ration/interval`,
    update: `${apiUrl}ration`,

    delete: `${apiUrl}ration`,
    deleteInterval: `${apiUrl}ration`,
  }
};


