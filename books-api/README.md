# Simple Books API

## Prerequisites
node >= 14.16.7

## How to start the app

```
cd books-api
npm install
node index.js
```

The Books API will be accessible on [localhost:3000/books](http://localhost:3000/books).

## Available endpoints

### Get all books
*GET /books*

### Get book by ID
*GET /books/:bookId*

### Add new book
*POST /books*

Request body:
```
{ "author": "Author name", "title": "Book title" }
```

### Update book by ID
*PUT /books/:bookId*

Request body:
```
{ "author": "Author name", "title": "Book title" }
```

### Delete book by ID
*DELETE /books/:bookId*