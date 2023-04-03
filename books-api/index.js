const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const updateBooksFile = (content) => (
  fs.writeFile('./books.json', JSON.stringify(content, null, 2), (err) => {
    if (err) throw err;
    console.log('Books file has been updated.');
  })
);

app.get('/books', (req, res) => {
  const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
  return res.json(books);
});

app.get('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).send(`Book with ID ${bookId} not found.`);
  }

  return res.json(book);
});

app.post('/books', (req, res) => {
  const { author, title } = req.body;
  const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));

  if (!author || typeof author !== 'string' || !title || typeof title !== 'string') {
    return res.status(400).send('Missing or invalid data.');
  }

  const id = uuid.v4();
  const newBook = { id, author, title };
  const newBooks = [...books, newBook];

  try {
    updateBooksFile(newBooks);
  } catch (e) {
    return res.status(500).send('A server error occured.');
  }

  return res.json(newBook);
});

app.put('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
  const index = books.findIndex(b => b.id === bookId);

  if (index < 0) {
    return res.status(404).send(`Book with ID ${bookId} not found.`);
  }
  const { author, title } = req.body;

  if (!author || typeof author !== 'string' || !title || typeof title !== 'string') {
    return res.status(400).send('Missing or invalid data.');
  }

  const newBook = { ...books[index], author, title };
  const newBooks = [...books];
  newBooks.splice(index, 1, newBook);

  try {
    updateBooksFile(newBooks);
  } catch (e) {
    return res.status(500).send('A server error occured.');
  }

  return res.json(newBook);
});

app.delete('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
  const index = books.findIndex(b => b.id === bookId);

  if (index < 0) {
    return res.status(404).send(`Book with ID ${bookId} not found.`);
  }

  const newBooks = [...books];
  newBooks.splice(index, 1);

  try {
    updateBooksFile(newBooks);
  } catch (e) {
    return res.status(500).send('A server error occured.');
  }

  return res.send(`Book with ID ${bookId} was deleted.`);
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

module.exports = app;
