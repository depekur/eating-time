export const patterns = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  passNumbers: /[0-9]+/,
  passLetters: /[a-zA-Z]+/,
  name: /^[a-zA-Zа-яА-Я]+$/ui
};

export const counts = {
  email: {
    maxLength: 254,
    minLength: 5
  },
  password: {
    maxLength: 30,
    minLength: 7
  },
  name: {
    maxLength: 254,
    minLength: 3
  }
};
