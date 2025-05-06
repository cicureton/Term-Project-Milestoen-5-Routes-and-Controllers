# Roomfull Furniture Backend

## Installation
- Get the project
    - clone
        ```bash
        https://github.com/cicureton/Term-Project-Milestoen-6-Final-Project-Presentation.git
        ```
    - or download the zip.
- Open the project in VSCode.
- Open a Terminal.
- Install required packages.
    ```bash
    npm install
    ```
- Start the server.
    ```bash
    npm start
    ```

## API Endpoints
Use ThunderClient to try the following endpoints:

### Get list of Products

#### Request - GET /api/products

```
http://localhost:3000/api/products
```
### Response
```
[
  {"id":1,"name":"Oak Dining Table","category":"Dining","price":299.99,"description":"Solid oak dining table, seats 6."},
  {"id":2,"name":"Leather Armchair","category":"Seating","price":199.99,"description":"Comfortable brown leather chair."},
  {"id":3,"name":"Bookshelf","category":"Storage","price":89.99,"description":"5-tier wooden bookshelf."}
]
```
### Get a specific Product

### Request - GET /api/products/{id}

```
http://localhost:3000/api/products/1
```
### Response
```
{
  "id": 1,
  "name": "Oak Dining Table",
  "category": "Dining",
  "price": 299.99,
  "description": "Solid oak dining table, seats 6."
}
```
### Search Products

### Request - GET /api/products/search?q={query}
```
http://localhost:3000/api/products/search?q=chair
```
### Response
```
{
"id":2,
"name":"Leather Armchair",
"category":"Seating",
"price":199.99,
"description":"Comfortable brown leather chair."}
```
### Add a Product to Cart

### Request - POST /api/cart
```
http://localhost:3000/api/cart
```
### Request Body
```
{
  "id": 2
}
```
### Response 
```
{
  "message": "Product added to cart"
}
```

### Get Cart Contents

### Request - GET /api/cart
```
http://localhost:3000/api/cart
```
### Response
```
  {"id":2,"name":"Leather Armchair","category":"Seating","price":199.99,"description":"Comfortable brown leather chair."}
```
### Checkout

### Request - POST /api/cart/checkout
```
http://localhost:3000/api/cart/checkout
```
### Response
```
{
  "message": "Cart has been cleared"
}
```

### Admin: Add a New Product

### Request - POST /api/admin/products
```
http://localhost:3000/api/admin/products
```

### Request Body
```
{
  "name": "Lamp",
  "category": "Lighting",
  "price": 39.99,
  "description": "Desk lamp"
}
```
### Admin: Edit a Product

### Request - PUT /api/admin/products/{id}
```
http://localhost:3000/api/admin/products/1
```

### Request Body
```
{
  "name": "Oak Dining Table - Updated",
  "category": "Dining",
  "price": 349.99,
  "description": "Updated solid oak dining table, seats 6."
}
```

### Admin: Bulk Upload Products

### Request - POST /api/admin/products/bulk
```
http://localhost:3000/api/admin/products/bulk
```
### Request Body
```
  {
    "name": "Sofa",
    "category": "Seating",
    "price": 499.99,
    "description": "Comfy sofa"
  },
  {
    "name": "Bookshelf",
    "category": "Storage",
    "price": 89.99,
    "description": "5-tier wooden bookshelf"
  }
```
















