import React, { Component } from 'react';
import axios from 'axios';
// import EditTodo from "../components/edit-todo.component";
import { Link } from 'react-router-dom';
import { Api } from './Api';
import './style.css';

const ActionType = new Api();
const MatiralStatus = new Api();
const SourceArrival = new Api();


export default class CreateTodo extends Component {
    list = [];
    changeColor = false;
    constructor(props) {
        super(props);

        this.state = {

            fullName: '',
            email: '',
            gender: '',
            _id: '',
            date: '',
            issueDate: '',
            phoneNumber: '',
            houseNumber: '',
            fax: '',
            address: { houseAddress: '', city: '', postalCode: '', poBox: '' },
            pathFolder: '',
            actionType: '',
            matiralStatus:'',
            sourceArrival:''

            //isCompleted:false
        }
    }

    selectGender(gender) {
        if (gender === 1) {
            this.setState({ gender: 'men' })
        }
        if (gender === 2) {
            this.setState({ gender: 'women' })
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleAddressChange = (e) => {
        let address = Object.assign({}, this.state.address);

        switch(e.target.id){
            case "houseAddress":
            address.houseAddress = e.target.value;
            break;

            case "city":
            address.city = e.target.value;
            break;

            case "postalCode":
            address.postalCode = e.target.value;
            break;

            case "poBox":
            address.poBox = e.target.value;
            break;

        }
        this.setState({ address });
    }

    handleSubmit = (e) => {
        const newCustomer = {
            fullName: this.state.fullName,
            email: this.state.email,
            gender: this.state.gender,
            _id: this.state._id,
            date: this.state.date,
            issueDate: this.state.issueDate,
            houseNumber: this.state.houseNumber,
            phoneNumber: this.state.phoneNumber,
            fax: this.state.fax,
            actionType: this.state.actionType,
            matiralStatus: this.state.matiralStatus,
            sourceArrival: this.state.sourceArrival,
            address: {
                houseAddress: this.state.address.houseAddress,
                city: this.state.address.city,
                postalCode: this.state.address.postalCode,
                poBox: this.state.address.poBox,
            },
            pathFolder: 'public/uploads/' + this.state._id,
        };
        console.log(newCustomer);
        axios.post('http://localhost:4000/customers/add', newCustomer)
            .then(res => {

                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
        console.log('list', this.list);
    }
    render() {
        var grid = (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="fullName"
                            onChange={this.handleChange.bind(this)} placeholder="שם מלא"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="_id" placeholder="ת.ז"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="date" onChange={this.handleChange.bind(this)}
                            id="date" placeholder="תאריך לידה"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="email" placeholder="אימייל"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="date" onChange={this.handleChange.bind(this)}
                            id="issueDate" placeholder="תאריך הנפקת תעודת זהות"></input>
                    </div>
                    <div style={{ marginTop: '-1em', marginLeft: '5em' }}
                        className="col=md-2"
                        className="gender-position"
                        className={this.state.gender === "men" ? "gender-color" : ""} >
                        <label className="gender-font"
                            value={"men"}
                            id="gender"
                            onClick={() => this.selectGender(1)
                            }>
                            <i className="fa fa-male" aria-hidden="true"></i>
                        </label>
                    </div>
                    <div style={{ marginTop: '-1em', marginLeft: '5em' }}
                        className="col=md-2"
                        className="gender-position"
                        className={this.state.gender === "women" ? "gender-color" : ""} >
                        <label className="gender-font"
                            value={"women"}
                            id="gender"
                            onClick={() => this.selectGender(2)
                            }>
                            <i className="fa fa-female" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="houseNumber" placeholder="מספר בית"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="phoneNumber" placeholder="טלפון נייד"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="fax" placeholder="פקס"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-3">
                        <input className="form-control" type="text" onChange={this.handleAddressChange.bind(this)}
                            id="houseAddress" placeholder="כתובת"></input>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="text" onChange={this.handleAddressChange.bind(this)}
                            id="city" placeholder="עיר"></input>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="text" onChange={this.handleAddressChange.bind(this)}
                            id="postalCode" placeholder="מיקוד"></input>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="text" onChange={this.handleAddressChange.bind(this)}
                            id="poBox" placeholder="ת.ד"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                        <div className="col=md-4" style={{marginRight:"1em"}}>
                            <select  id="actionType" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{backgroundColor:"lightgrey"}}>סוג פעילות</option>
                                {ActionType.GetTypeAction().map((action) => <option  key={action.key} value={action.value}>{action.value}</option>)}
                            </select>
                        </div>
                        <div className="col=md-4" style={{marginRight:"1em"}}>
                            <select  id="matiralStatus" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{backgroundColor:"lightgrey"}}>מצב משפחתי</option>
                                {MatiralStatus.GetMatiralStatus().map((matiralStatus) => <option  key={matiralStatus.key} value={matiralStatus.value}>{matiralStatus.value}</option>)}
                            </select>
                        </div>
                        <div className="col=md-4" style={{marginRight:"1em"}}>
                            <select  id="sourceArrival" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{backgroundColor:"lightgrey"}}>מקור הגעה</option>
                                {SourceArrival.GetSourceArrival().map((sourceArrival) => <option  key={sourceArrival.key} value={sourceArrival.value}>{sourceArrival.value}</option>)}
                            </select>
                        </div>
                    </div>
                    <hr></hr>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success"
                            onClick={this.handleSubmit.bind(this)} >
                            <Link style={{ color: 'black' }} to={"/edit/" + this.state._id}>שמור והמשך</Link>
                        </button>
                    </div>

                </div>
            </div>
        );


        return (
            <div className="App" style={{ direction: "rtl" }}>
                <header className="App-header">
                    <h1 style={{ textAlign: 'center' }}><b>רישום לקוח</b></h1>
                    <div className="form-fields" >
                        {grid}
                    </div>
                </header>
            </div>
        );
    }

}
