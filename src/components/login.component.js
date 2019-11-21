
import React, { Component } from "../../node_modules/react";
import axios from '../../node_modules/axios';
// import { Button, FormGroup, Form Control } from "react-bootstrap";
import './style.css';
import { Link, Router, Route, Redirect, withRouter } from '../../node_modules/react-router-dom';
import { Api } from './Api';

const ActionType = new Api();


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            id: Number,
            errorCode: '',
            authMsg: '',
            authStatus: false,
            emptyField: false,
            isReq: false

        };
    }

    componentWillUnmount() {
        this.setState({ authStatus: true });
    }

    routesChange() {
        this.props.history.push('/dashboard');
        if (localStorage.getItem('loginStatus') && localStorage.getItem('loginStatus') == true) {
            localStorage.loginStatus = false;
        } else {
            localStorage.loginStatus = false;
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        if(event.target.id == 'actionType'  ){
            this.setState({isReq:false})
        }
    }

    SignUp() {
        this.props.history.push('/sign-up');

    }

    handleSubmit = event => {
        if (!this.state.actionType) {
            this.setState({
                isReq: true
            })
            return;
        }
        const loginDetails = {
            password: this.state.password,
            _id: this.state.id,
            actionType: this.state.actionType
        };
        axios.post('http://localhost:4000/customers/login', { loginDetails })
            .then(res => {
                if (res.status == 200) {
                    this.setState({ authStatus: true });
                    // this.routesChange();
                }
                if (res.status == 201) {
                    this.setState({ authMsg: res.data, authStatus: false });

                }
                loginDetails.authStatus = this.state.authStatus;

                this.props.onLogin(loginDetails);
            })
            .catch(function (err) {
                console.log('error', err);
            })
    }


    render() {
        return (
            <div className="container">
                {/* {this.state.authStatus === false ? */}
                <div >

                    <div className="card-header" style={{ marginTop: '10em'}}>
                        <h3 style={{ textAlign: 'center' }}><strong>כניסה למערכת</strong></h3>
                        <br></br>
                        <div className="input-group form-group">
                            <div className="input-group-prepend" style={{ width: '60%', marginRight: '12em' }}>
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i></span>
                                <input id="id" type="text" className="form-control" placeholder="קוד משתמש" onChange={this.handleChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend" style={{ width: '60%', marginRight: '12em' }}>
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i></span>
                                <input id="password" type="password" className="form-control" placeholder="סיסמא" onChange={this.handleChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="input-group form-group" style={{ marginRight: '24em' }}>
                            <div className="input-group-prepend" >
                                <select  style={this.state.isReq == true ? { boxShadow: '-1px 2px 4px 2px red' } : { boxShadow: '-1px 2px 4px 2px #ccc' }} id="actionType" onChange={this.handleChange.bind(this)} className="drop-down">
                                    <option value='' >בחר סוג פעילות</option>
                                    {ActionType.GetTypeAction().map((action) => <option key={action.key} value={action.key}>{action.value}</option>)}
                                </select>
                                {this.state.isReq == true ? <label style={{ marginRight: '1em', color: 'red', fontWeight: '700' }}>חובה</label> : null}

                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-md-6">
                                <button type="submit"  onClick={this.handleSubmit.bind(this)} className="loginButtons">התחבר</button>
                            </div>
                            <div className="col-md-6">
                                <button type="submit" className="loginButtons"><Link style={{color:'white'}} to="/signUp/">הירשם</Link> </button>
                            </div>
                        </div>
                        <div className="row" >

                            <div className="col-md-12">
                                {this.state.authStatus === false ?
                                    <label><strong>{this.state.authMsg}</strong></label>
                                    : ''
                                }
                                {this.state.emptyField === true ?
                                    <label><strong>יש להזין קוד משתמש</strong></label>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        );
    }
}
export default withRouter(Login)