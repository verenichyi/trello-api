# Trello API

REST API that allows you to perform simple CRUD operations with permission by user roles. 

In order to use you need to authorize in trello.com. Then use link https://trello.com/app-key to get the key and generate token. Copy the key and the token in file ".env" in API_KEY и API_TOKEN fields correspondigly.

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

### POSTMAN:

https://documenter.getpostman.com/view/19207805/UzBqpRGM
