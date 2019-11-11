
import React, { Component } from "../../node_modules/react";
import { BrowserRouter as Router, Route, Link, withRouter } from "../../node_modules/react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./create-todo.component";
import EditTodo from "./edit-todo.component";
import TodoList from "./list-todo.component";
import SignUp from "./signUp.component";
import DocsUpload from "./docs-upload.component";



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            LoggedIn: false,
            authStatus: false
        }


    }

    routeChanged = ()=>{
        this.setState({
            LoggedIn:false
        })
    }

    routeToDahBord = ()=>{
        this.setState({
            LoggedIn:true
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

    render() {
        return (

            <Router>

                <div className="container-fluid"  >
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <strong>ניהול לקוחות</strong>

                                <ul className="navbar-nav" >
                                    <li className="navbar-item">
                                        <Link to="/" onClick={this.routeToDahBord}  className="nav-link">רשימת לקוחות</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/create" onClick={this.routeChanged} className="nav-link">הוספת לקוח</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/" className="nav-link" onClick={this.logOut}><strong>התנתק</strong></Link>
                                    </li>
                                </ul>
                            </nav>
                            {
                                this.state.LoggedIn === true ?  <TodoList authData={this.props.authData} showList={this.state.LoggedIn}></TodoList> : ''
                            }
                            
                        </div>

                    {/* <Route path="/get" exact component={TodoList} /> */}
                    <Route path="/edit/:id" exact component={EditTodo} />
                    <Route path="/create" exact component={CreateTodo} />
                    <Route path="/docs/:id" exact component={DocsUpload} />
                    <Route path="/sign-up" exact component={SignUp} />

                    {/* <Route path="/dashboard" exact component={NavBar} /> */}
                </div>
            </Router>

        );
    }
}

export default withRouter(NavBar);