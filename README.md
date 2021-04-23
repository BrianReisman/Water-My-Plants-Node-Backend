# Water-My-Plants-Node-Backend

Base URL: https://water-my-plants-node.herokuapp.com/

A \* denotes required

Mock user for developement that already exists if you want to test the /api/auth/login endpoint:
username: 'testUser'
password: 'password'
You can also create new users following the schema below

## Auth
### Endpoint: /api/auth/register

| PROPERTY_NAME | PROPERTY_TYPE         |
| ------------- | --------------------- |
| username\*    | string, unique        |
| password\*    | string, min length 6. |
| phoneNumber\* | string (not number)   |

### Endpoint: /api/auth/login

| PROPERTY_NAME | PROPERTY_TYPE |
| ------------- | ------------- |
| username\*    | string        |
| password\*    | string        |

## User
### Endpoint: api/users/:id
| METHOD | PARAMETER | TYPE |
| ------ | --------- | ---- |
| [GET]  | :id       | id number of valid user|



<!-- # Water-My-Plants-Node-Backend

Base URL: https://water-my-plants-node.herokuapp.com/

A * denotes required

Mock user for developement that already exists if you want to test the /api/auth/login endpoint:
username: 'testUser'
password: 'password'
You can also create new users following the schema below

### Endpoint: /api/auth/register
PROPERTY_NAME   |PROPERTY_TYPE           
---|---
username*       |string, unique
password*       |string, min length 6.
phoneNumber*    |string (not number)

### Endpoint: /api/auth/login
PROPERTY_NAME|PROPERTY_TYPE           
---|---
 username*       | string
 password*       | string
 -->
