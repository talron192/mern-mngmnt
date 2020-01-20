import React, { Component } from '../../node_modules/react'
import {Link,Switch } from "../../node_modules/react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false,
      LoggedIn: false,
      showList: false,
      authStatus: false
    }
  }

  routeChanged = () => {
    this.setState({
      showList: false
    })
  }

  routeToDahBord = () => {
    console.log('routeToDahBord',this.props);

    this.setState({
      showList: true
    })
  }

  logOut = () => {
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
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    var sidebar = (
      <Switch>
        <div className="container-fluid" >
          <h1 style={{textAlign:'center'}}>גל ניהול לקוחות</h1> 
          <hr></hr>
          <div className="row">
            <div className="col-md-2">
              <div id="mySidenav" className="sidenav" style={{width:'250px'}}>
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <br></br>
                <Link style={{textAlign:'center'}} to="/" onClick={this.routeToDahBord} className="nav-link">רשימת לקוחות</Link>
                <Link to="/create" style={{textAlign:'center'}} onClick={this.routeChanged} className="nav-link">הוספת לקוח</Link>
                <Link to="/calandar" style={{textAlign:'center'}} onClick={this.routeChanged} className="nav-link">לוח פגישות</Link>
                <Link to="/" style={{textAlign:'center'}} className="nav-link" onClick={this.logOut}><strong>התנתק</strong></Link>
              </div>
              <div style={{ direction: 'rtl' }}>
                <span style={{ fontSize: '30px', cursor: 'pointer', float: 'right' }} onClick={this.openNav}>&#9776;</span>

              </div>
            </div>
          </div>
        </div>
      </Switch>



    )
    return (
      <div>
        {sidebar}
      </div>

    );

  }
}

