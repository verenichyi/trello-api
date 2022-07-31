# Trello API

REST API, который позволяет делать простые CRUD операции с разрешением доступа по ролям.

Для использования необходимо авторизоваться в trello.com. Затем по ссылке https://trello.com/app-key достать ключ и сгенерировать токен. Создать файл .env. Скопировать ключ и токен в файл .env в поля API_KEY и API_TOKEN.

---

### Requirements

- Code style (eslint)
- Create CRUD operations for the next entities: board, card. There are 2 types of users: Admin and simple user. Only admins can create, update and delete boards.
  - Board:
    - name
    - desc
  - Card:
    - name
    - desc
- Use helmetjs for secure reasons.
- Create minimum 2 custom middleware.
- Add and configure Logger for development(in console) and production(in file) environments.
- Use Joi to validate incoming parameters.
- Use postman for testing REST API.

---

### Документация POSTMAN:

https://documenter.getpostman.com/view/19207805/UzBqpRGM
