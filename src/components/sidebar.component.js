// src/components/Sidebar.js
import React, { Component } from '../../node_modules/react'
import SidebarIcon from './SidebarIcon.js'
import { BrowserRouter as Router, Route, Link, withRouter } from "../../node_modules/react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./create-todo.component";
import EditTodo from "./edit-todo.component";
import TodoList from "./list-todo.component";
import SignUp from "./signUp.component";
import DocsUpload from "./docs-upload.component";


class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false,
      LoggedIn: false,
      authStatus: false
    }


  }

  routeChanged = () => {
    this.setState({
      LoggedIn: false
    })
  }

  routeToDahBord = () => {
    this.setState({
      LoggedIn: true
    })
  }

  logOut = () => {
    // this.props.history.push('/');
    this.setState({
      authStatus: false
    })
    this.props.onLogout(this.state.authStatus);
  }
  componentDidMount() {

    this.setState({ LoggedIn: this.props.authStatus_ });
    if (localStorage.getItem('loginStatus') === false) this.setState({ loggedOut: false });
  }

  openNav() {
    console.log('open');
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    var sidebar = (
      <Router>
        <div >

          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
            <Link to="/" onClick={this.routeToDahBord} className="nav-link">רשימת לקוחות</Link>
            <Link to="/create" onClick={this.routeChanged} className="nav-link">הוספת לקוח</Link>
            <Link to="/" className="nav-link" onClick={this.logOut}><strong>התנתק</strong></Link>
          </div>
          <div style={{ direction: 'rtl' }}>
            <span style={{ fontSize: '30px', cursor: 'pointer', float: 'right' }} onClick={this.openNav}>&#9776;</span>

          </div>
          {
            this.state.LoggedIn === true ? <TodoList authData={this.props.authData} showList={this.state.LoggedIn}></TodoList> : ''
          }

          <Route path="/edit/:id" exact component={EditTodo} />
          <Route path="/create" exact component={CreateTodo} />
          <Route path="/docs/:id" exact component={DocsUpload} />
          <Route path="/sign-up" exact component={SignUp} />
        </div>
      </Router>



    )
    return (
      <div>
        {sidebar}
      </div>

    );

  }
}

export default withRouter(Sidebar);