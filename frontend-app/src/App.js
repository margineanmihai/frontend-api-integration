import Home from './components/Home';
import ShowBook from './components/ShowBook';
import BookForm from './components/BookForm';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route path="/" exact component={Home} key="home" />
        <Route path="/books" exact component={Home} key="home-books" />
        <Route path="/books/add" exact component={BookForm} key="add-book" />
        <Route path="/books/:bookId" exact component={ShowBook} key="show-book" />
        <Route path="/books/edit/:bookId" exact component={BookForm} key="edit-book" />
       </Switch>
       
    </BrowserRouter>
  );
}

export default App;
