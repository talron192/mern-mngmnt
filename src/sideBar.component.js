import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/font-awesome/css/font-awesome.css';

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/list-todo.component";
import Login from "./components/login.component";
import DocsUpload from "./components/docs-upload.component";
import $ from 'jquery';


$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

class SideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false,
      collapsed: Boolean
    }
  }

  hideAndShoeSideBar() {
    if (this.state.showSideBar == false) {
      this.setState({ showSideBar: true });

    } else {
      this.setState({ showSideBar: false });

    }

  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showHeader: true }), 2000);
  }
  render() {
    return (
        <div class="wrapper">

          <nav class="sidebar" >
            <div class="list-group">
              <a  class="list-group-item">
                <i class="fa fa-home"></i>&nbsp;
            <span>ראשי</span>
              </a>
              <div class="nested-menu">
                <a routerLink="/customer-details" class="list-group-item" >
                  <i class="fa fa-user"></i>&nbsp;
                <span>לקוח</span>
                </a>
                <li class="nested" >
                  <ul class="submenu">
                    <li><a  ><i class="fa fa-info-circle fa-fw"></i> כללי</a></li>
                    <li><a  ><i class="fa fa-area-chart fa-fw"></i> ניתוח עסקאות</a></li>
                    <li><a  ><i class="fa fa-credit-card fa-fw"></i> בקשת מקדמה</a></li>
                  </ul>
                </li>
              </div>
              <a  class="list-group-item">
                <i class="fa fa-user-plus"></i>&nbsp;
            <span>גיוס לקוחות</span>
              </a>
              <a  class="list-group-item">
                <i class="fa fa-folder"></i>&nbsp;
            <span>מסמכים</span>
              </a>
            </div>
            <div class="toggle-button" onclick={this.toggleCollapsed()}>
              <i class="fa fa-fw fa-angle-double-{{collapsed?'right':'left'}}"></i>&nbsp;
        <span>הסתר תפריט</span>
            </div>
          </nav>
        </div>
        );
      }
    }
    
    
    export default SideBar;
