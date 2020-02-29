import React, { Component } from '../../node_modules/react';
import { Api } from './Api';
// import  Templates  from './Api-Templates';
import axios from '../../node_modules/axios';
import Modal from '../../node_modules/react-modal';
import ModalHeader from '../../node_modules/react-bootstrap/ModalHeader';
import ModalBody from '../../node_modules/react-bootstrap/ModalBody';
import { getMsg } from '../actions/customerActions';
import { fileIsExist } from '../actions/customerActions';
import { connect } from 'react-redux';

import PowerAttorney_template from './PowerAttorney_template';
import Alert from '../../node_modules/react-bootstrap/Alert';


const PaidType = new Api();

class PowerAttorney extends Component {
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
            showMailDetails: false,
            RecieptContent: '',
            subject: '',
            emailContent: '',
            emailIsSent: false,
            responseAfterSent: '',
            showPopUp: false,
            loading: Boolean,
            fileIsExist: Boolean


        }
    }

    isDisabled = () => {
        if (this.state.loading == true) return true;
    }

    AppointmentModal() {
        const handleDismiss = () => this.setState({ emailIsSent: false });
        const handlePopUpMsg = () => this.setState({ showPopUp: false });

        return (
            <div style={{ width: '28em' }}>
                <div className="container">

                    <h3 style={{ textAlign: "center" }}>הפקת ייפוי כח</h3>
                    <hr></hr>
                    <div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">

                            {
                            <button className="btn btn-secondary" onClick={this.onClickHandler}>
                                {this.state.showPopUp ? <i style={{ width: '6em' }} className="fa fa-check fa-3" aria-hidden="true"></i> : ''}
                                הפק ייפוי כח
                            </button>}
                            {/* </OverlayTrigger> */}
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-secondary" disabled={!this.state.showPopUp && !this.props.fileIsExist} onClick={this.showEmailDetails.bind(this)}>שליחה למייל</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-secondary" disabled={!this.state.showPopUp && !this.props.fileIsExist} onClick={this.previewReceipt.bind(this)}>הצגת קבלה</button>
                        </div>
                    </div>
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
                <div >
                    <Modal isOpen={this.state.RecieptModalToShow} id="ReceiptModal"
                        onRequestClose={this.closePreviewReceipt}>
                        <ModalHeader onClick={this.closePreviewReceipt}  >
                            <h4>תצוגה מקדימה</h4>
                            <i style={{ cursor: 'pointer' }} className="fa fa-times" aria-hidden="true"></i>
                        </ModalHeader>
                        {/* <ModalBody >{this.state.msgEvent ? document.getElementById("ReceiptModal").html("../public/uploads/12345678/Recipts/ProdReciept"):''}</ModalBody> */}
                        <ModalBody ><PowerAttorney_template state={this.props.state}></PowerAttorney_template></ModalBody>
                    </Modal>
                </div >
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

    sendToEmail = () => {
        const emailData = { templateName: 'PowerAttorney', email: this.props.state.obj.email, subject: this.state.subject, content: this.state.emailContent }
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
        const newReceipt = {
            priceBeforeVAT: this.state.priceBeforeVAT,
            description: this.state.description,
            discount: this.state.discount,
            paidType: this.state.paidType,
            priceAfterDiscount: this.state.priceAfterDiscount,
            eventID: Math.random(),
            _id: this.state._id,
            templateName: 'PowerAttorney'

        };
        axios.post('http://localhost:4000/customers/addTemplateFile/' + this.state._id, newReceipt)
            .then(res => {
                this.setState({
                    msgEvent: res.data,
                    showReciept: true,
                    showPopUp: true
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
                showMailDetails: false
            });
        }
        if (e.target.value == 2) {
            this.setState({
                [e.target.id]: e.target.value,
                isDetailsPaymentFixed: true,
                isDetailsPerHours: false,
                showMailDetails: false
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
        this.props.file_IsExist({ customerId: this.props.id, fileName: 'PowerAttorney' });
        console.log('componentDidMount-props', this.props);

        this.setState({
            _id: this.props.id
        });
    }

    componentWillMount() {
        console.log('componentWillMount-props', this.props.fileIsExist);
        // console.log(this.props.file_IsExist({customerId:this.props.id,fileName:'PowerAttorney'})); 
    }

    render() {
        return (
            this.AppointmentModal()
        )
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps', state);
    // this.setState({
    //     fileIsExist:state.sitesReducer.fileIsExist
    // })
    return {
        fileIsExist: state.sitesReducer.fileIsExist
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getCustomer: () => { disaptch(getMsg()); },
        file_IsExist: (fileData) => { disaptch(fileIsExist(fileData)); }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerAttorney);
