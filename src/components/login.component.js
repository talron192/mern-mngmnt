import React, { Component } from "react";
import axios from 'axios';
// import { Button, FormGroup, Form Control } from "react-bootstrap";
import './style.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.userName.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        const loginDetails = {
            userName: this.state.userName,
            password: this.state.password,
        };

        axios.get('http://localhost:4000/customers')
            .then(res => {
                // const posts = res.data.data.children.map(obj => obj.data);
                console.log(res);
            })
            .catch(function (err) {
                console.log('error', err);
            })


    }

    render() {
        return (
            <div className="container">
                <div className="card" style={{ width: '40%' }}>

                    <div className="card-header">
                        <h3><strong>מסך כניסה</strong></h3>

                        <div className="card-body" style={{ paddingLeft: '20%' }}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i></span>
                                    <input type="text" className="form-control" placeholder="username"></input>
                                </div>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i></span>
                                    <input type="text" className="form-control" placeholder="password"></input>
                                </div>
                            </div>
                            <div style={{ paddingLeft: '5em' }}>
                                <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-dark"><strong>התחבר</strong></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            //     <div className="Login">
            //         <form onSubmit={this.handleSubmit}>
            //             <FormGroup controlId="userName" bsSize="large">
            //                 <FormControl
            //                     autoFocus
            //                     type="userName"
            //                     value={this.state.userName}
            //                     onChange={this.handleChange}
            //                 />
            //             </FormGroup>
            //             <FormGroup controlId="password" bsSize="large">
            //                 <FormControl
            //                     value={this.state.password}
            //                     onChange={this.handleChange}
            //                     type="password"
            //                 />
            //             </FormGroup>
            //             <Button
            //                 block
            //                 bsSize="large"
            //                 disabled={!this.validateForm()}
            //                 type="submit"
            //             >
            //                 Login
            //   </Button>
            //         </form>
            //     </div>
        );
    }
}