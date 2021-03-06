import React, {useContext} from 'react';
import {BrowserRouter,Route, Switch } from 'react-router-dom';
// import createBrowserHistory from "history/createBrowserHistory";
import EditTodo from "../components/edit-todo.component";
import CreateTodo from "../components/create-todo.component";
import DocsUpload from "../components/docs-upload.component";
import TodoList from "../components/list-todo.component";
import Calandar from "../components/calandar.component";
import MyCalendar from "../components/calandar.component";


const createBrowserHistory =require("history").createBrowserHistory;

const history = createBrowserHistory();

const PrivateRoute = props => {
  return (
    <div>
      <Switch history={history} >
        <Route path="/edit/:id" exact component={EditTodo} />
        <Route path="/create" exact component={CreateTodo} />
        <Route path="/docs/:id" exact component={DocsUpload} />
        <Route path="/calandar" exact component={MyCalendar} />
        <Route path="/" props={props} exact component={() => <TodoList props={props} />} />
      </Switch>
    </div>
  );
}

export default PrivateRoute;