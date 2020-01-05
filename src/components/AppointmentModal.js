import React, { Component } from '../../node_modules/react';
import { Api } from './Api';
import axios from '../../node_modules/axios';
import Alert from '../../node_modules/react-bootstrap/Alert';
import './style.css';




const EventType = new Api();


export default class AppointmentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            eventDate: '',
            eventTime: '',
            eventType: '',
            details: '',
            eventID: 0,
            msgEvent: '',
            showMsg: false,
            isEmptyField:false

        }
    }

    AppointmentModal() {
        const handleDismiss = () => this.setState({ showMsg: false });

        return (
            <div className="container">
                <h3 style={{ textAlign: "center" }}>יצירת אירוע חדש</h3>
                <hr></hr>
                <div className="row">
                    <div className="col=md-3">
                        <select placeholder="סוג אירוע" id="eventType" className="drop-down"
                            onChange={this.handleChange.bind(this)} >
                            <option  style={{ backgroundColor: "lightgrey" }}>סוג פגישה</option>

                            {EventType.GetEventType().map((action) => <option key={action.key} value={action.value}>{action.value}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="text" id="eventTime" onChange={this.handleChange.bind(this)}
                            placeholder="שעת הפגישה"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="date" onChange={this.handleChange.bind(this)}
                            id="eventDate" placeholder="תאריך אירוע"></input>
                    </div>
                </div>
                <br></br>
                {/* <hr></hr> */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">סיכום</span>
                            </div>
                            <textarea  
                                className="form-control" aria-label="With textarea" id="details"                              
                                onChange={this.handleChange.bind(this)}>
                            </textarea>
                        </div>
                        <button className="btn btn-secondary"
                            onClick={this.onClickHandler}>
                            צור אירוע
                    </button>
                        {
                            this.state.showMsg === true ?
                                <Alert style={{ width: 'auto', textAlign: 'center' }} variant="success" onClose={handleDismiss} dismissible>
                                    <Alert.Heading>{this.state.msgEvent}</Alert.Heading>
                                </Alert> : ''
                        }
                    </div>
                </div>
                <hr></hr>
            </div>
        )
    }

    isEmptyFields = ()=>{

        if(this.state.details == '' || this.state.eventType =='' || this.state.eventDate == ''){
            this.setState({isEmptyField:true , showMsg:true , msgEvent : 'יש למלא את כל השדות' })  ;
            return true ;
        }
        return false ;

    }

    changeDateFormat(date){
        let   arrDate=date.split('-');
        let newDate = arrDate[2]+'/'+arrDate[1]+'/'+arrDate[0];
        console.log('newDate',newDate);
        return newDate;
    }

    onClickHandler = () => {
        const newEvent = {
            eventDate: this.changeDateFormat(this.state.eventDate),
            details: this.state.details,
            eventTime: this.state.eventTime,
            eventType: this.state.eventType,
            eventID: Math.random(),
            _id: this.state._id
        };
        console.log('newEvent',newEvent);
       if(this.isEmptyFields()) return ;

        axios.post('http://localhost:4000/customers/addEvent/' + this.state._id, newEvent)
            .then(res => {

                this.setState({
                    msgEvent: res.data,
                    showMsg: true
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        this.setState({
            _id: this.props.id
        });
    }

    render() {

        return (
            this.AppointmentModal()
        )
    }
}
