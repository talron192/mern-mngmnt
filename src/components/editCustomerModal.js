import React, { Component } from 'react';
// import MaterialTable from "../../node_modules/material-table";
import "../../node_modules/react-table/react-table.css";
import Alert from '../../node_modules/react-bootstrap/Alert';
import store from '../store.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { eventISDone } from '../actions/customerActions';
import { getCustomerData } from '../actions/customerActions';





import './style.css';



class EditCustomerModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      actionType: '',
      MortgageAdviceType: '',
      matiralStatus: '',
      sourceArrival: '',
      customerType: '',
      isSucsses: false

    }
  }


  updateCustomerData = e => {
    console.log('store', store.getState());
    let obj = this.state;
    let propToUpdate = {};
    for (let key in obj) {
      // console.log('obj[key]',obj[key]);
      // console.log('key',key);
      if (obj[key] != "") {
        propToUpdate[key] = obj[key];
      }
    } //updateCustomer
    // console.log('propToUpdate',propToUpdate);
    console.log('store', this.props);


    axios.post("http://localhost:4000/customers/updateCustomer/" + this.props.customer._id, propToUpdate)
      .then(res => { // then print response status
        console.log('res', res);

        this.setState({ isSucsses: true });
        this.props.event_is_done(true);
        this.props.get_Customer_Data(this.props.customer._id);



      })
      .catch(err => {
        console.log(err);
      });

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

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  editableForm() {
    console.log('editableForm', this.props.customer);
    return (
      <div  >
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">שם הלקוח</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" onChange={this.handleChange.bind(this)} id="fullName" placeholder={this.props.customer.fullName} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">תאריך הנפקת ת.ז</label>
          <div className="col-sm-4">
            <input type="date" className="form-control form-control-lg" id="issueDate" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.issueDate} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">תאריך לידה</label>
          <div className="col-sm-4">
            <input type="date" className="form-control form-control-lg" id="date" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.date} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">טלפון בית</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="houseNumber" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.houseNumber} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">טלפון נייד</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="phoneNumber" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.phoneNumber} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">פקס</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="fax" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.fax} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">אימייל</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="email" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.email} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">רחוב</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="houseAddress" onChange={this.handleAddressChange.bind(this)} placeholder={this.props.customer.houseAddress} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">עיר</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="city" onChange={this.handleAddressChange.bind(this)} placeholder={this.props.customer.address.city} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">מיקוד</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="postalCode" onChange={this.handleAddressChange.bind(this)} placeholder={this.props.customer.address.postalCode} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">ת.ד</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="poBox" onChange={this.handleAddressChange.bind(this)} placeholder={this.props.customer.address.poBox} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">סוג פעילות</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="actionType" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.actionType} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">מצב משפחתי</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="matiralStatus" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.matiralStatus} />
          </div>
        </div>
        
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">גיל</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="age" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.age} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">אישר קשר-שם מלא</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="anotherContact.otherContactFullName" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.hasOwnProperty('anotherContact') ? this.props.customer.anotherContact.otherContactFullName :  ''}  />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">איש קשר-ת.ז</label>
          <div className="col-sm-4">
            <input className="form-control form-control-lg" id="anotherContact.otherContactId" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.hasOwnProperty('anotherContact') ? this.props.customer.anotherContact.otherContactId : ''} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">איש קשר-תאריך לידה</label>
          <div className="col-sm-4">
            <input type="date" className="form-control form-control-lg" id="anotherContact.otherContactDate" onChange={this.handleChange.bind(this)} placeholder={this.props.customer.hasOwnProperty('anotherContact') ?  this.props.customer.anotherContact.otherContactDate : ''} />
          </div>
        </div>
        <div style={{ textAlign: 'center' }} className="col-auto">
          <button onClick={this.updateCustomerData.bind(this)} className="btn btn-primary mb-2">עדכן</button>
        </div>
        {
          this.state.isSucsses ?
            <Alert style={{ width: '22em', right: '25em' }} variant="success" >
              <Alert.Heading>עודכן בהצלחה</Alert.Heading>
            </Alert> : ''

        }
      </div>


    )
  }


  componentDidMount() {
  }

  render() {

    return (
      this.editableForm()
    )
  }


}
const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = disaptch => {
  return {

    event_is_done: (eventStatus) => {
      console.log(eventStatus);
      disaptch(eventISDone(eventStatus));
    },
    get_Customer_Data: (id) => {
      console.log(id);
      disaptch(getCustomerData(id));
  }


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerModal);

