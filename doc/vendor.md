# Vendor API Spec

### Create Vendor

Endpoint : **POST**  /api/vendors

Request Header : 
- X-API-TOKEN : token

Request Body

```json
{
  "vendor_name": "Vendor 1",
  "address": "Jl. Jalan",
  "unit": 1
}
```

Response Body (Success)
```json
{
  "status": "OK",
  "data": {
    "id": "92na-asdf23-asdf12",
    "name": "Vendor 1",
    "address": "Jl. Jalan",
    "unit": 1
  }
}
```

Response Body (Failed)
```json
{
  "status": "ERROR",
  "errors": {
    "email": "Email already registered"
  }
}
```

### Get Vendor

Endpoint : **GET**  /api/vendors

Query Parameter :
- unit : 1 (1, 2, or 3)

Request Header :
- X-API-TOKEN : token

Response Body (Success)
```json
{
  "status": "OK",
  "data": [
    {
      "id": "92na-asdf23-asdf12",
      "name": "Vendor 1",
      "address": "Jl. Jalan",
      "unit": 1
    },
    {
      "id": "92na-asdf23-asdf14",
      "name": "Vendor 2",
      "address": "Jl. Jalan Aja",
      "unit": 2
    }
  ]
}
```

Response Body (Failed)
```json
{
  "status": "ERROR",
  "errors": {
    "message": "Vendor is not found!"
  }
}
```