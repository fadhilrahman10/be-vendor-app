# User API Spec

### Register User

Endpoint : **POST**  /api/user

Request Body

```json
{
  "name": "Test",
  "email": "test@example.com",
  "password": "password"
}
```

Response Body (Success)
```json
{
  "data": {
    "name": "Test",
    "email": "test@example.com"
  }
}
```

Response Body (Failed)
```json
{
  "errors": {
    "email": "Email already registered"
  }
}
```

### Login User

Endpoint : **POST**  /api/user/login

Request Body

```json
{
  "email": "test@example.com",
  "password": "secret"
}
```

Response Body (Success)
```json
{
  "data": {
    "name": "Test",
    "email": "test@example.com",
    "token": "uuid"
  }
}
```

Response Body (Failed)
```json
{
  "errors": {
    "email": "Email or password is not match with our records, ..."
  }
}
```


### Logout User

Endpoint : **DELETE**  /api/user/current

Request Header: 
- X-API-TOKEN : token

Response Body (Success)
```json
{
  "status": "OK"
}
```

Response Body (Failed)
```json
{
  "status": "ERROR",
  "errors": {
    "message": "Unauthorized..."
  }
}
```