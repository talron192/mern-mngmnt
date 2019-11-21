
import React, { Component } from "../../node_modules/react";
import axios from '../../node_modules/axios';
// import { Button, FormGroup, Form Control } from "react-bootstrap";
import './style.css';
import { Link, Router, Route } from '../../node_modules/react-router-dom';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            id: Number,
            errorCode: '',
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {

        const loginDetails = {
            password: this.state.password,
            _id: this.state.id
        };
        axios.post('http://localhost:4000/customers/signUp/', loginDetails)
            .then(res => {
                console.log(res);
            })
            .catch(function (err) {
                console.log('error', err);
            })
    }

    render() {
        return (
            <div className="container">
            <div >

                <div className="card-header" style={{ marginTop: '10em'}}>
                    <h3 style={{ textAlign: 'center' }}><strong>רישום למערכת</strong></h3>
                        <br></br>
                        <div className="input-group form-group">
                            <div className="input-group-prepend" style={{ width: '60%',marginRight:'12em' }}>
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i></span>
                                <input id="id" type="text" className="form-control" placeholder="קוד משתמש" onChange={this.handleChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend" style={{ width: '60%',marginRight:'12em' }}>
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i></span>
                                <input id="password" type="text" className="form-control" placeholder="סיסמא" onChange={this.handleChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-md-6">
                                <button type="submit"  onClick={this.handleSubmit.bind(this)} className="loginButtons"><strong>הירשם</strong></button>
                            </div>
                            <div className="col-md-6">
                                <button type="submit"  className="loginButtons"><Link style={{color:'white'}} to="/">מסך כניסה </Link> </button>
                            </div>
                        </div>
                </div>
            </div>

        </div>
        );
    }
}