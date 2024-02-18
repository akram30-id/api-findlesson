# User API Spec

## Register User

Endpoint : POST /api/user/register

Request Body :

```json
{
    "username": "test",
    "password": "password",
    "confirm_password": "password"
}
```

Response Success:

```json
{
    "success": true,
    "data": {
        "username": "test",
        "token": "token"
    }
}
```

## Login

Endpoint : POST /api/user/login

Request Body :

```json
{
    "username": "test",
    "password": "password"
}
```

Response Success:

```json
{
    "success": true,
    "data": {
        "username": "test",
        "token": "token"
    }
}
```
