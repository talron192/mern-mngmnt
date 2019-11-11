import React, { Component } from '../../node_modules/react';
import { Api } from './Api';
import axios from '../../node_modules/axios';
import Modal from '../../node_modules/react-modal';
import ModalHeader from '../../node_modules/react-bootstrap/ModalHeader';
import ModalBody from '../../node_modules/react-bootstrap/ModalBody';
import ProductionReceipt_Template from './ProdRecipet_template';

const PaidType = new Api();


export default class ProductionReceipt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            priceBeforeVAT: '',
            discount: '',
            discountHour: '',
            paidType: '',
            description: '',
            priceAfterDiscount: '',
            hourCount: '',
            pricePerHour: '',
            isDetailsPerHours: false,
            isDetailsPaymentFixed: false,
            showPriceAfterDiscount: false,
            eventID: 0,
            msgEvent: '',
            showReciept: false,
            RecieptModalToShow: false,
            RecieptContent: ''

        }
    }

    AppointmentModal() {
        const handleDismiss = () => this.setState({ showReciept: false });

        return (
            <div className="container">
                <h3 style={{ textAlign: "center" }}>הפקת קבלה</h3>
                <hr></hr>
                <div className="row">
                    <div className="col=md-3" style={{ padding: '1em' }}>
                        <select placeholder="סוג אירוע" id="paidType" className="drop-down"
                            onChange={this.handleTypeChange.bind(this)} >
                            <option style={{ backgroundColor: "lightgrey" }}>סוג תשלום</option>

                            {PaidType.GetPaidType().map((action) => <option key={action.key} value={action.key}>{action.value}</option>)}
                        </select>
                    </div>
                </div>
                <hr></hr>
                {this.state.isDetailsPerHours == true ?
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <input className="form-control" type="number" onChange={this.handlePaymentDetails.bind(this)}
                                    id="hourCount" placeholder="שעות עבודה"></input>
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" type="number" onChange={this.handlePaymentDetails.bind(this)}
                                    id="pricePerHour" placeholder="מחיר שעת עבודה"></input>
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" type="number" id="discountHour" onChange={this.handlePaymentDetails.bind(this)}
                                    placeholder="הנחה מסך הסכום ב-%"></input>
                            </div>
                        </div>
                        {/* <div className="col=md-6" id="priceAfterDiscount">
                            <span>{this.state.showPriceAfterDiscount == true ? this.state.priceAfterDiscount + ' ש"ח' : ''}</span>
                        </div> */}

                    </div>

                    : ''}
                {
                    this.state.isDetailsPaymentFixed == true ?
                        <div className="row">
                            <div className="col-md-5">
                                <input className="form-control" type="number" onChange={this.handlePaymentDetails.bind(this)}
                                    id="priceBeforeVAT" placeholder="סכום לפני מעמ"></input>
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" type="number" id="discount" onChange={this.handlePaymentDetails.bind(this)}
                                    placeholder="הנחה ב-%"></input>
                            </div>
                            <div className="col=md-3" id="priceAfterDiscount">
                                <span>{this.state.showPriceAfterDiscount == true ? this.state.priceAfterDiscount + ' ש"ח' : ''}</span>
                            </div>
                        </div> : ''
                }
                <hr></hr>
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">תיאור</span>
                            </div>
                            <textarea
                                className="form-control" aria-label="With textarea" id="description"
                                onChange={this.handleChange.bind(this)}>

                            </textarea>
                        </div>
                        {
                            this.state.isDetailsPaymentFixed == true || this.state.isDetailsPerHours == true ?
                                <button className="btn btn-secondary"
                                    onClick={this.onClickHandler}>
                                    הפק קבלה לתשלום
                                </button> :
                                ''
                        }
                        {
                            this.state.showReciept == true ?
                                <div className="row" style={{padding:'3em'}}> 
                                <br></br>
                                    <div className="col-md-6" style={{ textAlign: 'center', textDecoration: 'none' }}> <button className="btn btn-secondary" onClick={this.sendToEmail.bind(this)}>שליחה למייל</button></div>
                                    <div className="col-md-6" style={{ textAlign: 'center', textDecoration: 'none' }}> <button className="btn btn-secondary" onClick={this.previewReceipt.bind(this)}>הצגת קבלה</button></div>
                                    <hr></hr>
                                </div>
                                : ''
                        }
                        <div></div>
                    </div>
                </div>
                <hr></hr>
                <Modal isOpen={this.state.RecieptModalToShow} id="ReceiptModal"
                    onRequestClose={this.closePreviewReceipt}>
                    <ModalHeader onClick={this.closePreviewReceipt}  >
                        <h4>תצוגה מקדימה</h4>
                        <i style={{ cursor: 'pointer' }} className="fa fa-times" aria-hidden="true"></i>
                    </ModalHeader>
                    {/* <ModalBody >{this.state.msgEvent ? document.getElementById("ReceiptModal").html("../public/uploads/12345678/Recipts/ProdReciept"):''}</ModalBody> */}
                    <ModalBody ><ProductionReceipt_Template prodReciept={this.state} state={this.props.state} ></ProductionReceipt_Template></ModalBody>
                </Modal>
            </div>
        )
    }

    previewReceipt = e => {
        this.setState({
            RecieptModalToShow: true,
        });
    }

    sendToEmail = ()=>{
        const emailData ={email : this.props.state.obj.email}
        axios.post('http://localhost:4000/customers/sendEmail/' + this.state._id,emailData)
    }
    closePreviewReceipt = e => {
        this.setState({
            RecieptModalToShow: false,
        });

    }

    onClickHandler = () => {
        const newReceipt = {
            priceBeforeVAT: this.state.priceBeforeVAT,
            description: this.state.description,
            discount: this.state.discount,
            paidType: this.state.paidType,
            priceAfterDiscount: this.state.priceAfterDiscount,
            eventID: Math.random(),
            _id: this.state._id,
            templateName:'ProdRecipet'
        };
        // console.log('newReceipt', newReceipt);
        // axios.post('http://localhost:4000/customers/addReceipt/' + this.state._id, newReceipt)
        axios.post('http://localhost:4000/customers/addTemplateFile/' + this.state._id, newReceipt)
            .then(res => {
                this.setState({
                    msgEvent: res.data,
                    showReciept: true,
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
    handleTypeChange = (e) => {

        if (e.target.value == 1) {
            this.setState({
                [e.target.id]: e.target.value,
                isDetailsPerHours: true,
                isDetailsPaymentFixed: false,
            });
        }
        if (e.target.value == 2) {
            this.setState({
                [e.target.id]: e.target.value,
                isDetailsPaymentFixed: true,
                isDetailsPerHours: false
            });
        }
    }

    handlePaymentDetails = (e) => {

        if (document.getElementById('discount') && document.getElementById('discount').value != ""
            && document.getElementById('priceBeforeVAT')
            && document.getElementById('priceBeforeVAT').value != "") {
            let discount = (document.getElementById('discount').value / 100);
            let priceBeforeVAT = parseInt(document.getElementById('priceBeforeVAT').value);
            this.setState({
                discount: document.getElementById('discount').value,
                priceBeforeVAT: document.getElementById('priceBeforeVAT').value,
                priceAfterDiscount: priceBeforeVAT - (priceBeforeVAT * discount),
                showPriceAfterDiscount: true
            });
        }
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