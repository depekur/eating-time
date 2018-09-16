export const CONFIG = {
  apiUrl: 'http://api.kitchen.loc/',
  defaultEatingCount: 5,
  siteName: '',
  siteTitle: 'Eating Time',
  eatingNames: [
    'завтрак',
    'полдник',
    'обед',
    'перекус',
    'ужин',
  ],
  eatingRecommendation: [
    'манная каша, яйца, бутерброды с сыром',
    'яблоко, булочка, банан',
    'борщ, пюрешка, котлетки',
    'шаурма, бургер, чипсы',
    'творог, стейк, курица',
  ]
};

export const apiUrls = {
  login: `${CONFIG.apiUrl}login`,
  register: `${CONFIG.apiUrl}register`,

  userInfo: `${CONFIG.apiUrl}user`,

  filters: `${CONFIG.apiUrl}filters`,
  ingredients: `${CONFIG.apiUrl}ingredients/`,
  addRecipe: `${CONFIG.apiUrl}add-recipe`,

  file: {
    upload: `${CONFIG.apiUrl}file/upload`,
    delete: `${CONFIG.apiUrl}file/delete/`,
  },

  recipe: {
    add: `${CONFIG.apiUrl}add-recipe`,
    all: `${CONFIG.apiUrl}recipes`,
    single: `${CONFIG.apiUrl}recipe/`,
    favorite: `${CONFIG.apiUrl}favorite`
  },

  ration: {
    get: `${CONFIG.apiUrl}ration`,
    getInterval: `${CONFIG.apiUrl}ration/interval`,
    update: `${CONFIG.apiUrl}ration`,

    delete: `${CONFIG.apiUrl}ration`,
    deleteInterval: `${CONFIG.apiUrl}ration`,
  }
};


