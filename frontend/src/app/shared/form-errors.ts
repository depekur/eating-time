export const validationMessages = {
  email: {
    required: 'Вы забыли ввесли email',
    maxlength: 'Слишком длинный адрес',
    minlength: 'Слишком короткий адрес',
    pattern: 'Не похоже на email, попробуй еще'
  },
  password: {
    required: 'Введите пароль',
    maxlength: 'Слишком длинный пароль',
    minlength: 'Слишком короткий пароль',
    passwordPattern: 'Пароль должен содержать цифры и буквы'
  },
  name: {
    required: 'Please provide an name',
    maxlength: 'Max name length is 50 symbols',
    minlength: 'Min name length is 3 symbols',
    pattern: 'Name must contain only letters'
  }
};
