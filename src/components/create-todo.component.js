import React, { Component } from '../../node_modules/react';
import axios from '../../node_modules/axios';
// import axios from '../../node_modules/axios';
// import EditTodo from "../components/edit-todo.component";
import { Link } from '../../node_modules/react-router-dom';
import { Api } from './Api';
import './style.css';

const ActionType = new Api();
const MatiralStatus = new Api();
const CustomerType = new Api();
const MortgageAadviceList = new Api();


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
            MortgageAdviceType: '',
            matiralStatus: '',
            sourceArrival: '',
            customerType: '',
            otherContactFullName: '',
            otherContactId: '',
            otherContactDate: '',
            toNextStep: false,
            changeStyle: false,
            isMortgageAdvice: false,
            addMoreContactClicked: false,
            failId: false,
            failsIdMsg: ''

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
        if (e.target.id == 'actionType') {

            let isMortgageAdvice = e.target.value.split("-")[0] == "1" ? true : false;
            this.setState({ isMortgageAdvice: isMortgageAdvice });
        }
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    getCalculationAge(birthday) {

        let birthYear = parseInt(birthday.split("-")[0]);
        var d = new Date();
        var cuurentYear = d.getFullYear();
        let age = cuurentYear - birthYear;

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

    addMoreContact = () => {
        this.setState({ addMoreContactClicked: true });
    }

    cancelMoreContact = () => {
        this.setState({ addMoreContactClicked: false });
    }

    handleSubmit = (e) => {
        let pattern = new RegExp("^\\d{9}$");
        if(!pattern.test(this.state._id)){
            console.log('fail id');
            this.setState({
                failId:true,
                failsIdMsg:'חובה 9 ספרות'
            })
            return;
        }
        if (this.state._id == '' || this.state.actionType == '' || this.state.email == '') {
            this.setState({
                toNextStep: false,
                failId:true,
                failsIdMsg:'',
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
            age: this.getCalculationAge(this.state.date),
            issueDate: this.state.issueDate,
            houseNumber: this.state.houseNumber,
            phoneNumber: this.state.phoneNumber,
            fax: this.state.fax,
            actionType: this.state.actionType,
            mortgageAdviceType: this.state.MortgageAdviceType,
            matiralStatus: this.state.matiralStatus,
            sourceArrival: this.state.sourceArrival,
            customerType: this.state.customerType,
            anotherContact:{
                otherContactFullName: this.state.otherContactFullName,
                otherContactId: this.state.otherContactId,
                otherContactDate: this.state.otherContactDate
            },
            address: {
                houseAddress: this.state.address.houseAddress,
                city: this.state.address.city,
                postalCode: this.state.address.postalCode,
                poBox: this.state.address.poBox,
            },
            pathFolder: 'public/uploads/' + this.state._id,
        };
        console.log('newCustomer', newCustomer);

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" id="fullName"
                            onChange={this.handleChange.bind(this)} placeholder="שם מלא"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={this.state.changeStyle == false && this.state._id == '' ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} type="number" onChange={this.handleChange.bind(this)}
                            id="_id" placeholder="ת.ז"></input>
                        {this.state.changeStyle == true && this.state._id == '' ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}
                        {this.state.failId ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>{this.state.failsIdMsg}</label> : null}
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="date" onChange={this.handleChange.bind(this)}
                            id="date" title="תאריך לידה"></input>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} style={this.state.changeStyle == false && this.state.actionType == '' ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} type="text" onChange={this.handleChange.bind(this)}
                            id="email" placeholder="אימייל"></input>
                        {this.state.changeStyle == true && this.state.email == '' ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}

                    </div>
                    <div className="col-md-4">
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="date" onChange={this.handleChange.bind(this)}
                            id="issueDate" title="תאריך הנפקת תעודת זהות"></input>
                    </div>
                    <div style={{ marginTop: '-1em', marginLeft: '9em', marginRight: '5em' }}
                        className="col=md-2"
                        className="gender-position"
                        className={this.state.gender === "men" ? "gender-color" : ""} >
                        <label className="gender-font"
                            value={"men"}
                            id="gender"
                            onClick={() => this.selectGender(1)}>
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
                        <select style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} style={this.state.changeStyle == false && this.state.actionType == '' ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} id="actionType"
                            onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{ backgroundColor: "lightgrey" }}>סוג פעילות</option>
                            {ActionType.GetTypeAction().map((action) => <option key={action.key} value={action.key + '-' + action.value}>{action.value}</option>)}
                        </select>
                        {this.state.changeStyle == true && this.state.actionType == '' ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}

                    </div>
                    {this.state.isMortgageAdvice ?

                        <div className="col=md-4" style={{ marginRight: "1em" }}>
                            <select style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} style={this.state.changeStyle == false && this.state.actionType == '' ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} id="MortgageAdviceType"
                                onChange={this.handleChange.bind(this)} className="drop-down" style={{ textIndent: '0em' }}>
                                <option style={{ backgroundColor: "lightgrey" }}>סוג משכנתא</option>
                                {MortgageAadviceList.GetMortgageAadviceList().map((type) => <option key={type.key} value={type.value}>{type.value}</option>)}
                            </select>
                            {this.state.changeStyle == true && this.state.actionType == '' ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}

                        </div> : ''
                    }
                    <div className="col=md-4" style={{ marginRight: "1em" }}>
                        <select style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} id="matiralStatus" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{ backgroundColor: "lightgrey" }}>מצב משפחתי</option>
                            {MatiralStatus.GetMatiralStatus().map((matiralStatus) => <option key={matiralStatus.key} value={matiralStatus.value}>{matiralStatus.value}</option>)}
                        </select>
                    </div>
                    <div className="col=md-4" style={{ marginRight: "1em" }}>
                        <select style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} id="customerType" onChange={this.handleChange.bind(this)} className="drop-down">
                            <option style={{ backgroundColor: "lightgrey" }}>מעמד</option>
                            {CustomerType.GetCustomerType().map((customerType) => <option key={customerType.key} value={customerType.value}>{customerType.value}</option>)}
                        </select>
                    </div>
                    {/* <div className="col=md-4" style={{ marginRight: "1em" }}>
                        <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" onChange={this.handleChange.bind(this)}
                            id="sourceArrival" placeholder="מקור הגעה"></input>
                    </div> */}
                </div>
                <br />
               {!this.state.addMoreContactClicked ? <div className="row">
                    <div style={{ textAlign: 'center' }} className="col-md-12">
                        <i style={{ fontSize: '2em', color: '#f7b742', cursor: 'pointer' }} onClick={this.addMoreContact.bind(this)} className="fa fa-plus-circle fa-2" aria-hidden="true"></i>
                    </div>
                </div> : ''}
                <hr></hr>
                {
                    this.state.addMoreContactClicked ?
                        <div>
                            <h5 style={{textAlign:'center'}}><u>איש קשר נוסף</u></h5>
                            <br/>
                            <div className="row">
                                <div className="col-md-4">
                                    <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="text" id="otherContactFullName"
                                        onChange={this.handleChange.bind(this)} placeholder="שם מלא"></input>
                                </div>
                                <div className="col-md-4">
                                    <input className="form-control" style={this.state.changeStyle == false && this.state._id == '' ? { boxShadow: '-1px 2px 4px 2px #ccc' } : { boxShadow: ' -1px 2px 4px 2px red' }} type="number" onChange={this.handleChange.bind(this)}
                                        id="otherContactId" placeholder="ת.ז"></input>
                                    {this.state.changeStyle == true && this.state._id == '' ? <label style={{ float: 'right', color: 'red', fontWeight: '700' }}>חובה</label> : null}
                                </div>
                                <div className="col-md-4">
                                    <input className="form-control" style={{ boxShadow: '-1px 2px 4px 2px #ccc' }} type="date" onChange={this.handleChange.bind(this)}
                                        id="otherContactDate" title="תאריך לידה"></input>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12" style={{ textAlign: 'center' }}>
                                    <i style={{ fontSize: '2em', color: '#f7b742', cursor: 'pointer' }} onClick={this.cancelMoreContact.bind(this)} className="fa fa-minus-circle" aria-hidden="true"></i>

                                </div>
                            </div>
                        </div> : ''



                }
                <hr></hr>

                <div className="row">
                    <div className="col-md-12" style={{ textAlign: 'center' }}>
                        <button className="btn btn-secondary" style={{ borderRadius: '1em', borderColor: '#f7b742', backgroundColor: '#f7b742', 'width': '10em', 'fontWeight': 'bold' }}
                            onClick={this.handleSubmit.bind(this)} >
                            <Link style={{ color: 'black', textDecoration: 'none' }} to={this.state.toNextStep == true ? "/docs/" + this.state._id : "/create/"}>שמור והמשך</Link>
                        </button>
                    </div>

                </div>
            </div>
        );


        return (
            <div className="App" style={{ direction: "rtl", width: '80%', marginRight: '19em' }}>
                <header className="App-header">
                    <h3 style={{ textAlign: 'initial' }}>רישום לקוח</h3>
                    <div className="form-fields" style={{ paddingTop: '2em' }} >
                        {grid}
                    </div>
                </header>
            </div>
        );
    }

}
