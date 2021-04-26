# Water-My-Plants-Node-Backend

Base URL: https://water-my-plants-node.herokuapp.com/

A \* denotes required

Mock user for developement that already exists if you want to test the /api/auth/login endpoint:
username: 'testUser'
password: 'password'
You can also create new users following the schema below

## Auth

### Endpoint: /api/auth/register

| PROPERTY NAME | PROPERTY TYPE         |
| ------------- | --------------------- |
| username\*    | string, unique        |
| password\*    | string, min length 6. |
| phoneNumber\* | string (not number)   |

### Endpoint: /api/auth/login

| PROPERTY NAME | PROPERTY TYPE |
| ------------- | ------------- |
| username\*    | string        |
| password\*    | string        |

## User

### Endpoint: api/users/:id

In order to access any endpoint beginning with api/users... your request needs to have:
req.headers.authorization
[note: headers (plural), not header (singular)]
[note: authorization not authentication]
Authorization is the key, the value should be the token recieved upon successful login

| METHOD | PARAMETER        | TYPE                             | NOTE                                                                            |
| ------ | ---------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| [GET]  | :userid          | id number of valid user          | gets all plants of specified user                                               |
| [GET]  | :userid/:plantid | id number of valid user && plant | gets the one specified plant of particular user                                 |
| [DEL]  | :userid/:plantid | id number of valid user && plant | deletes the one specified plant                                                 |
| [POST] | :userid          | id number of valid user          | added a new plant to the specified user                                         |
| [PUT]  | :userid/plantid  | id number of valid user && plant | updates one specific plant. Include the entire plant object with all properties |

#### Plant Schema

| PROPERTY NAME    | PROPERTY TYPE |
| ---------------- | ------------- |
| species\*        | string        |
| h20_frequency\*  | string        |
| plant_nickname\* | string        |

Example

```
plant: {
  species: "Abelmoschus Medik",
  h20_frequency: "twice daily",
  plant_nickname: "Willow plant",
}
```
