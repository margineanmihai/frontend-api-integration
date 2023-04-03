import { useState, useEffect } from 'react';
import './Book.scss';
import './Home.scss'

const ShowBook = (props) => {
    const [book, setBook] = useState([]);
    const bookId = props.match.params.bookId;
    useEffect(() => {
      fetch(`/books/${bookId}`)
           .then((response) => response.json())
           .then((data) => {
              setBook(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
    }, [bookId]);

    return (
        <div className="home">
            <div className="home-content">
                Integrate Books API with front-end application
                <div className="books-header">
                    <div className="books-title">Book Description:</div>
                    <button onClick={() => props.history.replace(`/books`)}> Back </button>
                </div>
                <div className='book-container'>
                    <div className='book-container-content'>
                        <div className='book-container-row'>
                            <div className='book-label'>Id:</div>
                            <div>{book.id}</div>
                        </div>
                        <div className='book-container-row'>
                            <div className='book-label'>Author:</div>
                            <div>{book.author}</div>
                        </div>
                        <div className='book-container-row'>
                            <div className='book-label'>Title:</div>
                            <div>{book.title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowBook;