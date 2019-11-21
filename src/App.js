// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// import TodoList from "./components/list-todo.component";
// import EditTodo from "./components/edit-todo.component";
// import NavBar from "./components/navBar.component";
// import Login from "./components/login.component";
// import SignUp from "./components/signUp.component";
// import Sidebar from "./components/sidebar.component";
// import PrivateRoute from "./Routes/PrivateRoute";


// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       authStatus_: false,
//       authData: {}

//     }
//   }

//   loginHandler = (authData) => {
//     this.setState({
//       authStatus_: authData.authStatus,
//       authData: authData
//     })
//   }

//   logoutHandler = (authData) => {
//     this.setState({
//       authStatus_: authData.authStatus,
//     })
//   }



//   render() {
//     let routes = (
//       <Switch>
//         <Route
//           path="/"
//           exact
//           render={props => (
//             <Login
//               {...props}
//               onLogin={this.loginHandler}
//             // loading={this.state.authLoading}
//             />
//           )}
//         />
//         <Route
//           path="/signUp"
//           exact
//           render={props => (
//             <SignUp
//               {...props}
//             // loading={this.state.authLoading}
//             />
//           )}
//         />
//         <Redirect to="/signUp" />
//       </Switch>
//     )
//     if (this.state.authStatus_) {
//       routes = (
//         <React.Fragment>
//           <Switch>
//             <Route
//               path="/"
//               exact
//               render={props => (
//                 <Sidebar
//                   onLogout={this.logoutHandler}
//                   authData={this.state.authData}
//                   authStatus_={this.state.authStatus_} />
//               )}
//             />
//             <Route
//               path="/"
//               exact
//               render={props => (
//                 <TodoList
//                   authData={this.state.authData}
//                   authStatus_={this.state.authStatus_} />
//               )}
//             />
//             <Redirect to="/" />
//           </Switch>
//         </React.Fragment>

//       );
//     }
//     return (
//       <div>
//         {routes}
//         {/* {<Sidebar></Sidebar>} */}
//       </div>
//     )
//   }
// }

// export default App;





import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TodoList from "./components/list-todo.component";
import EditTodo from "./components/edit-todo.component";
import NavBar from "./components/navBar.component";
import Login from "./components/login.component";
import SignUp from "./components/signUp.component";
import Sidebar from "./components/sidebar.component";
import PrivateRoute from "./Routes/PrivateRoute";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authStatus_: false,
      authData: {}

    }
  }

  loginHandler = (authData) => {
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
          exact
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
      <div>
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
    // return (
    //   <div>
    //     {this.state.authStatus_ ?
    //       <Sidebar
    //         onLogout={this.logoutHandler}
    //         authData={this.state.authData}
    //         authStatus_={this.state.authStatus_}
    //       >

    //       </Sidebar> : ''}
    //     {routes}
    //   </div>
    // )
  }
}

export default App;



