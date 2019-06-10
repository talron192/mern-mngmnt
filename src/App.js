import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/font-awesome/css/font-awesome.css';

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/list-todo.component";
import Login from "./components/login.component";
import DocsUpload from "./components/docs-upload.component";
import { CustomerProvider } from "./components/CustomerContext";


class App extends Component {


  componentDidMount() {
    setTimeout(() => this.setState({ showHeader: true }), 2000);
  }
  render() {
    return (
      // <CustomerProvider>
      <div >
        <Router>
          <div className="container"  >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/loginDetails" className="navbar-brand">
                ניהול לקוחות
              </Link>
              <ul  className="navbar-nav mr-auto" >
                <li  className="navbar-item">
                  <Link to="/get" className="nav-link">רשימת לקוחות</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">הוספת לקוח</Link>
                </li>
              </ul>
            </nav>
            <Route path="/loginDetails" exact component={Login} />
            <Route path="/get" exact component={TodoList} />
            <Route path="/edit/:id" exact component={EditTodo} />
            <Route path="/create" exact component={CreateTodo} />
            <Route path="/docs/:id" exact component={DocsUpload} />
          </div>
        </Router>
      </div>
      // </CustomerProvider>

    );
  }
}

export default App;
