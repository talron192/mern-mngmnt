import React, { Component } from '../../node_modules/react';
import axios from '../../node_modules/axios';
// import axios from '../../node_modules/axios';
// import EditTodo from "../components/edit-todo.component";
import { Link } from '../../node_modules/react-router-dom';
import { Api } from './Api';
import './style.css';

const ActionType = new Api();
const MatiralStatus = new Api();

export default class CreateTodo extends Component {
    list = [];
    changeColor = false;
    constructor(props) {
        super(props);

        this.state = {

            list: [],
            fullName: '',
            email: '',
            gender: '',
            customer_id: '',
            _id: '',
            date: '',
            age: '',
            issueDate: '',
            phoneNumber: '',
            houseNumber: '',
            fax: '',
            address: { houseAddress: '', city: '', postalCode: '', poBox: '' },
            pathFolder: '',
            actionType: '',
            matiralStatus: '',
            sourceArrival: '',
            toNextStep: false,
            changeStyle: false

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
        console.log(e.target.id);
        console.log(e.target.value);
        if (e.target.id == '_id') {
            this.setState({
                changeStyle: false
            })
        }
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    getCalculationAge(birthday) {

        let birthYear = parseInt(birthday.split("-")[0]);
        var d = new Date();
        var cuurentYear = d.getFullYear();
        let age = cuurentYear-birthYear;

        return age.toString();
    }

    handleAddressChange = (e) => {
        let address = Object.assign({}, this.state.address);

        switch (e.target.id) {
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
        if (this.state._id == '' || this.state.actionType == '') {
            this.setState({
                toNextStep: false,
                changeStyle: true
            });
            return;
        } else {
            this.setState({
                toNextStep: true,
                changeStyle: false
            });
        }
        const newCustomer = {
            fullName: this.state.fullName,
            email: this.state.email,
            gender: this.state.gender,
            customer_id: this.state.list.length + 1,
            _id: this.state._id,
            date: this.state.date,
            age:this.getCalculationAge(this.state.date),
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

        axios.post('http://localhost:4000/customers/add', newCustomer)
            .then(res => {

                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customers/get')
            .then(res => {
                this.setState({ list: res.data });

            })
            .catch(function (err) {
                console.log('error-componentMount', err);
            });
    }
    render() {
        var grid = (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" id="fullName"
                            onChange={this.handleChange.bind(this)} placeholder="שם מלא"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={this.state.changeStyle == false ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} type="number" onChange={this.handleChange.bind(this)}
                            id="_id" placeholder="ת.ז"></input>
                        {this.state.changeStyle == true ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="date" onChange={this.handleChange.bind(this)}
                            id="date" placeholder="תאריך לידה"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleChange.bind(this)}
                            id="email" placeholder="אימייל"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="date" onChange={this.handleChange.bind(this)}
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
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleChange.bind(this)}
                            id="houseNumber" placeholder="מספר טלפון נוסף"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleChange.bind(this)}
                            id="phoneNumber" placeholder="טלפון נייד"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleChange.bind(this)}
                            id="fax" placeholder="פקס"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-3">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleAddressChange.bind(this)}
                            id="houseAddress" placeholder="כתובת"></input>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleAddressChange.bind(this)}
                            id="city" placeholder="עיר"></input>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleAddressChange.bind(this)}
                            id="postalCode" placeholder="מיקוד"></input>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleAddressChange.bind(this)}
                            id="poBox" placeholder="ת.ד"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col=md-4" style={{ marginRight: "1em" }}>
                        <select style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} style={this.state.changeStyle == false ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} id="actionType" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{ backgroundColor: "lightgrey" }}>סוג פעילות</option>
                            {ActionType.GetTypeAction().map((action) => <option key={action.key} value={action.key+'-'+action.value}>{action.value}</option>)}
                        </select>
                        {this.state.changeStyle == true ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}

                    </div>
                    <div className="col=md-4" style={{ marginRight: "1em" }}>
                        <select style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} id="matiralStatus" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{ backgroundColor: "lightgrey" }}>מצב משפחתי</option>
                            {MatiralStatus.GetMatiralStatus().map((matiralStatus) => <option key={matiralStatus.key} value={matiralStatus.value}>{matiralStatus.value}</option>)}
                        </select>
                    </div>
                    <div className="col=md-4" style={{ marginRight: "1em" }}>
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleChange.bind(this)}
                            id="sourceArrival" placeholder="מקור הגעה"></input>
                    </div>
                </div>
                <hr></hr>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-secondary" style={{ borderRadius:'1em',borderColor:'#f7b742',backgroundColor:'#f7b742','width': '10em', 'fontWeight': 'bold' }}
                            onClick={this.handleSubmit.bind(this)} >
                            <Link style={{ color: 'black', textDecoration: 'none' }} to={this.state.toNextStep == true ? "/docs/" + this.state._id : "/create/"}>שמור והמשך</Link>
                        </button>
                    </div>

                </div>
            </div>
        );


        return (
            <div className="App" style={{ direction: "rtl" }}>
                <header className="App-header">
                    <h1 style={{ textAlign: 'center' }}><b>רישום לקוח</b></h1>
                    <div className="form-fields" style={{paddingTop: '2em'}} >
                        {grid}
                    </div>
                </header>
            </div>
        );
    }

}
