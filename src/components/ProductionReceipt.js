import React, { Component } from '../../node_modules/react';
import { Api } from './Api';
import axios from '../../node_modules/axios';
import Modal from '../../node_modules/react-modal';
import ModalHeader from '../../node_modules/react-bootstrap/ModalHeader';
import ModalBody from '../../node_modules/react-bootstrap/ModalBody';
import ProductionReceipt_Template from './ProdRecipet_template';
import Alert from '../../node_modules/react-bootstrap/Alert';


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
            RecieptContent: '',
            totalPricePerHour: '',
            totalPriceAfterDiscount: '',
            showMailDetails:false,
            loading:Boolean,
            subject: '',
            emailContent: '',
            emailIsSent: false,
            responseAfterSent: '',

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
                                <input className="form-control" type="number" onChange={this.handlePaymentPerHourDetails.bind(this)}
                                    id="hourCount" placeholder="שעות עבודה"></input>
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" type="number" onChange={this.handlePaymentPerHourDetails.bind(this)}
                                    id="pricePerHour" placeholder="מחיר שעת עבודה"></input>
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" type="number" id="discountHour" onChange={this.handlePaymentPerHourDetails.bind(this)}
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
                                <div className="row" style={{ padding: '3em' }}>
                                    <br></br>
                                    <div className="col-md-6" style={{ textAlign: 'center', textDecoration: 'none' }}> <button className="btn btn-secondary" onClick={this.showEmailDetails.bind(this)}>שליחה למייל</button></div>
                                    <div className="col-md-6" style={{ textAlign: 'center', textDecoration: 'none' }}> <button className="btn btn-secondary" onClick={this.previewReceipt.bind(this)}>הצגת קבלה</button></div>
                                    <hr></hr>
                                </div>
                                : ''
                        }
                         {this.state.showMailDetails ?
                        <div>
                            <div className="row">

                                <div className="col-md-12" style={{ paddingTop: '1em' }}>
                                    <input type="text" onChange={this.handleChange.bind(this)} style={{ border: '0', borderBottom: '1px solid grey' }} className="form-control" placeholder="נושא" aria-label="Example text with button addon" aria-describedby="button-addon1" id="subject"></input>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-12" >

                                    <div className="input-group mb-3" style={{ paddingTop: '2em' }} >
                                        <div className="input-group-prepend" >
                                            <button className="btn btn-outline-secondary" type="button" disabled={this.isDisabled()} onClick={this.sendToEmail.bind(this)}>
                                                {this.isDisabled() && <i className="fa fa-refresh fa-spin"></i>}
                                                שלח
                                                </button>
                                        </div>
                                        <input id="emailContent" type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" ></input>
                                    </div>
                                </div>
                            </div>
                            {this.state.emailIsSent ?

                                <div className="row">
                                    <div className='col-md-12'>
                                        <Alert variant="success" onClose={handleDismiss} dismissible>
                                            <Alert.Heading>{this.state.responseAfterSent}</Alert.Heading>
                                        </Alert>
                                    </div>
                                </div> : ''
                            }
                        </div>
                        : ''}

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

    showEmailDetails = () => {

        this.setState({ showMailDetails: true });
    }

    isDisabled = () => {
        if (this.state.loading == true) return true;
    }

    sendToEmail = () => {
        const emailData = { email: this.props.state.obj.email };
        this.setState({ loading: true });

        axios.post('http://localhost:4000/customers/sendEmail/' + this.state._id, emailData)
    }
    sendToEmail = () => {
        const emailData = { templateName: 'ProdRecipet', email: this.props.state.obj.email, subject: this.state.subject, content: this.state.emailContent }
        console.log(emailData);
        this.setState({ loading: true });
        axios.post('http://localhost:4000/customers/sendEmail/' + this.state._id, emailData).then(
            (res) => {
                this.setState({
                    emailIsSent: true,
                    responseAfterSent: res.data,
                    loading: false
                });

                console.log(res.data);
            }
        )
    }
    closePreviewReceipt = e => {
        this.setState({
            RecieptModalToShow: false,
        });

    }

    onClickHandler = () => {

        if (this.state.pricePerHour && this.state.hourCount) {
            let pricePerHour = document.getElementById('pricePerHour').value;
            let hourCount = document.getElementById('hourCount').value;
            this.setState({ totalPricePerHour: pricePerHour * hourCount });
            setTimeout(()=>{
                if (this.state.discountHour) {
                    this.setState({ totalPriceAfterDiscount: this.state.totalPricePerHour - (this.state.totalPricePerHour * (this.state.discountHour / 100)) })
                }
            })
        }
            setTimeout(() => {

                const newReceipt = {
                    totalPricePerHour: this.state.totalPricePerHour,
                    totalPriceAfterDiscount:this.state.totalPriceAfterDiscount,
                    priceBeforeVAT: this.state.priceBeforeVAT,
                    description: this.state.description,
                    discount: this.state.discount,
                    paidType: this.state.paidType,
                    priceAfterDiscount: this.state.priceAfterDiscount,
                    hourCount: this.state.hourCount,
                    pricePerHour: this.state.pricePerHour,
                    discountHour: this.state.discountHour,
                    eventID: Math.random(),
                    _id: this.state._id,
                    templateName: 'ProdRecipet'
                };
                console.log('newReceipt', newReceipt);
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
            })
        

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handlePaymentPerHourDetails = (e) => {
        console.log('handlePaymentPerHourDetails', e.target.id);
        console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value,

        })

    }
    handleTypeChange = (e) => {
        this.setState({showReciept:false});
        if (e.target.value == 1) {
            this.setState({
                [e.target.id]: e.target.value,
                isDetailsPerHours: true,
                isDetailsPaymentFixed: false,
                showMailDetails:false,
                priceBeforeVAT:'',
                discount:'',
                priceAfterDiscount:''


            });
        }
        if (e.target.value == 2) {
            this.setState({
                [e.target.id]: e.target.value,
                isDetailsPaymentFixed: true,
                isDetailsPerHours: false,
                showMailDetails:false,
                pricePerHour:'',
                hourCount:'',
                discountHour:'',
                totalPriceAfterDiscount:'',
                totalPricePerHour:''

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
