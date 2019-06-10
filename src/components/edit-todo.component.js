import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Customer = props => (
    console.log(props),
    <div className="row">
        <div className="col-md-3">
            <label>שם הלקוח: {props.customer.fullName}</label>
        </div>
        <div className="col-md-3">
            <label>תעודת זהות: {props.customer._id}</label>
        </div>
        <div className="col-md-3">
            <label>תאריך הנפקת ת.ז: {props.customer.issueDate}</label>
        </div>
        <div className="col-md-3">
            <label>תאריך לידה: {props.customer.date}</label>
        </div>

    </div>
)

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            success: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/customers/getId/" + this.props.match.params.id, { id: this.props.match.params.id })
            .then(res => { // then print response status
                this.setState({ obj: res.data });
            }).then(
                this.success = true,
                console.log('componentDidMount', this.success)
            )
            .catch(err => {
                console.log(err);
            });
    }

    customerData() {

        // var address = this.state.obj.address;

        if (this.success == true) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3><b></b>כרטיס לקוח של : {this.state.obj.fullName}</h3>
                            <span style={{float:"left"}}> <Link to={"/docs/" + this.state.obj._id}>העלאת מסמכים <i class="fa fa-upload" aria-hidden="true"></i></Link> </span>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-3">
                            <label>שם הלקוח: <b>{this.state.obj.fullName}</b></label>
                        </div>
                        <div className="col-md-3">
                            <label>תעודת זהות: <b>{this.state.obj._id}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label>תאריך הנפקת ת.ז: <b>{this.state.obj.issueDate}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label>תאריך לידה: <b>{this.state.obj.date}</b> </label>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-3">
                            <label>טלפון בית: <b>{this.state.obj.houseNumber}</b></label>
                        </div>
                        <div className="col-md-3">
                            <label>טלפון נייד: <b>{this.state.obj.phoneNumber}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label>פקס: <b>{this.state.obj.fax}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label>אימייל: <b>{this.state.obj.email}</b> </label>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-3">
                            <label> רחוב: <b>{this.state.obj.address.houseAddress}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label> עיר: <b>{this.state.obj.address.city}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label>מיקוד: <b>{this.state.obj.address.postalCode}</b> </label>
                        </div>
                        <div className="col-md-3">
                            <label>ת.ד: <b>{this.state.obj.address.poBox}</b> </label>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            );
        }


    }

    render() {


        return (
            <div style={{ direction: "rtl", textAlign: "center" }} className="form-fields">

                {
                    this.customerData()
                }
            </div>
        )
    }
}

