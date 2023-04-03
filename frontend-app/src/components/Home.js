import React, { useState, useEffect } from 'react';
import Book from './Book';
import './Home.scss';

const Home = (props) => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
      fetch('/books')
           .then((response) => response.json())
           .then((data) => {
              setBooks(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
    }, []);

    return (
        <div className="home">
            <div className="home-content">
                Integrate Books API with front-end application
                <div className="books-header">
                    <div className="books-title">The Books:</div>
                    <button onClick={() => props.history.push('/books/add')}>Add Book</button>
                </div>
                
                <div className="books-container">
                {books.length > 0 &&
                    books.map(book =>
                        <Book
                            key={book.id}
                            book={book}
                        />
                    )
                }
                </div>
            </div>
      </div>
    )
}

export default Home;