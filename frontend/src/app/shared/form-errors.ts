export const validationMessages = {
  email: {
    required: 'Вы забыли ввесли email',
    maxlength: 'Слишком длинный адрес',
    minlength: 'Слишком короткий адрес',
    pattern: 'Невалидный email'
  },
  password: {
    required: 'Введите пароль',
    maxlength: 'Слишком длинный пароль',
    minlength: 'Слишком короткий пароль',
    passwordPattern: 'Пароль должен содержать цифры и буквы'
  },
  name: {
    required: 'Введите свое имя',
    maxlength: 'Слишком длинное имя',
    minlength: 'Слишком короткое имя',
    pattern: 'Имя должно содержать только буквы'
  },
  recipe: {
    photo: {
      required: 'Фото рецепта должно быть обязательно',
    },
    title: {
      required: 'Введите название рецепта',
    },
    body: {
      required: 'Введите которкое описание рецепта',
    }
  }


};
