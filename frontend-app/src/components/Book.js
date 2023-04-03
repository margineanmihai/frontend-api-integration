import { withRouter } from "react-router-dom";
import './Book.scss';

const Book = (props) => {
    const {book} = props;
    const deleteBook = (bookId) => {
        fetch(`/books/${bookId}`, {
            method: "DELETE"
          })
          .then(() => props.history.go(0))
          .catch((err) => {
            console.log(err.message);
         });
    }
    return (
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

            <div className='book-container-actions'>
                <button onClick={() => props.history.push(`/books/${book.id}`)}> View </button>
                <button onClick={() => props.history.push(`/books/edit/${book.id}`)}> Edit </button>
                <button onClick={() => deleteBook(book.id)}> Delete </button>
            </div>
        </div>
    );
}

export default withRouter(Book);