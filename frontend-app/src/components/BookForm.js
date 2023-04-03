import { useState, useEffect } from 'react';
import './Book.scss';
import './Home.scss'

const BookForm = (props) => {
    const [book, setBook] = useState({author:'', title:''});
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const bookId = props.match.params.bookId;
    useEffect(() => {
        if(!!bookId) {
            fetch(`/books/${bookId}`)
            .then((response) => response.json())
            .then((data) => {
               setBook(data);
               setAuthor(data.author);
               setTitle(data.title);
            })
            .catch((err) => {
               console.log(err.message);
            });
        }
    }, [bookId]);
      

    const handleSubmit = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        if(!!bookId) {
            //edit
            fetch(`/books/${bookId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ author,title })
              })
              .then(() => props.history.replace(`/books`))
              .catch((err) => {
                console.log(err.message);
             });
        } else {
            //save
            fetch(`/books`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ author,title })
              })
              .then(() => props.history.replace(`/books`))
              .catch((err) => {
                console.log(err.message);
             });
        }
    }

    return (
        <div className="home">
            <div className="home-content">
                Integrate Books API with front-end application
                <div className="books-header">
                    <div className="books-title">{bookId ? 'Edit' : 'Add'} Book:</div>
                    <button onClick={() => props.history.replace(`/books`)}> Back </button>
                </div>
                <form method="post" onSubmit={handleSubmit} className='book-form'>
                    <div className='book-container'>
                        <div className='book-container-content'>
                            {!!bookId &&
                                <div className='book-container-row'>
                                    <div className='book-label'>Id:</div>
                                    <div>{book.id}</div>
                                </div>
                            }
                            <div className='book-container-row'>
                                <div className='book-label'>Author:</div>
                                <div><input type="text" name="author" value={!!author ? author : book.author} onChange={e => setAuthor(e.target.value)} /></div>
                            </div>
                            <div className='book-container-row'>
                                <div className='book-label'>Title:</div>
                                <div><input type="text" name="title" value={!!title ? title : book.title} onChange={e => setTitle(e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                    <button className='submit-btn' type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}


export default BookForm;