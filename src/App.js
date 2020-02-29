
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signUp.component";
import Sidebar from "./components/sidebar.component";
import AuthHelperMethods from "./components/AuthHelperMethods";
import PrivateRoute from "./Routes/PrivateRoute";




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authStatus_: false,
      authData: {}

    }
  }
  /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
  Auth = new AuthHelperMethods();

  loginHandler = (authData) => {
    console.log(authData);

    this.setState({
      authStatus_: authData.authStatus,
      authData: authData
    })
  }

  logoutHandler = (authData) => {
    this.setState({
      authStatus_: authData.authStatus,
    })
  }



  render() {
    let routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Login
                {...props}
                onLogin={this.loginHandler}
              // loading={this.state.authLoading}
              />
            )}
          />
          <Route
            path="/signUp"
            render={props => (
              <SignUp
                {...props}
              // loading={this.state.authLoading}
              />
            )}
          />
          <Redirect to="/signUp" />
        </Switch>
    )
    if (this.state.authStatus_) {
      routes = (
        <React.Fragment>
          <PrivateRoute
            authData={this.state.authData}
            authStatus_={this.state.authStatus_}
          />
        </React.Fragment>

      );
    }
    return (
      <div >
        {this.state.authStatus_ ?
          <div>
            <Sidebar
              onLogout={this.logoutHandler}
              authData={this.state.authData}
              authStatus_={this.state.authStatus_}
            />
          </div>

          : ''}
        {routes}
      </div>
    )
  }
}

export default App;



