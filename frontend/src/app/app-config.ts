export const config = {
  apiUrl: 'http://api.kitchen.loc/'
};

export const apiUrls = {
  login: `${config.apiUrl}login`,
  register: `${config.apiUrl}register`,

  recipeMeta: `${config.apiUrl}recipes-meta`,
  ingredients: `${config.apiUrl}ingredients/`,

  file: {
    upload: `${config.apiUrl}file/upload`,
    delete: `${config.apiUrl}file/delete/`,
  },
};
