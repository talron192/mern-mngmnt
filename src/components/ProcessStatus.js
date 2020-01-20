import React, { Component } from 'react';
import { Api } from './Api';
import axios from 'axios';
import LinearDeterminate from './processBar';
import Alert from '../../node_modules/react-bootstrap/Alert';



const StatusList = new Api();
// const State = useContext(StateContext);

export default class ProcessStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {

            status: { key: '', value: '' },
            statusList: [],
            statusDeleted: false,
            modalIsOpen: false,
            modalOpened: true,
            shoeResMsg: false,
            responseMsg: '',

        }
    }


    handleStatusClick(e) {

        if (document.getElementById('status_' + e.key).checked) {
            // console.log(statusArr);
            let status = Object.assign({}, this.state.status);
            status.key = e.key;
            status.value = e.value;
            this.setState({ status });
            this.setState(prevState => ({
                statusList: [...prevState.statusList, status],
                statusDeleted: false,
                modalOpened: false,

            }))
        } else {
            // console.log(document.getElementById('status_' + e.key));
            this.removeStatusFromList(this.state.statusList, e)
        }
    }

    async removeStatusFromList(list, statusToRemove) {
        let arr = [];

        for (let i in list) {
            if (list[i].key == statusToRemove.key) {
                await list.splice(i, 1);
                arr = await list;
                await this.setState({ statusList: arr, statusDeleted: true });

            }
        }
    }

    saveStatusProcess = () => {

        console.log(this.state.statusList);

        axios.post('http://localhost:4000/customers/saveProcessStatus/' + this.props.id,
            this.state.statusList).then(
                (res) => {
                    console.log(res.data);
                    this.setState({ responseMsg: res.data, shoeResMsg: true })

                }
            )
    }

    componentDidMount() {
        axios.post("http://localhost:4000/customers/getProcessStatus/" + this.props.id, { id: this.props.id })
            .then(res => { // then print response status
                this.setState({ statusList: res.data, modalIsOpen: this.props.isOpen });
            })
            .catch(err => {
                console.log(err);
            });
        this.setState({
            _id: this.props.id
        });
    }

    isExists = (status) => {
        for (let obj of this.state.statusList) {
            if (obj.key == status.key) {
                return true;
            }
        }
    }

    ProccessModal() {
        const handleDismiss = () => this.setState({ shoeResMsg: false });

        return (
            <div style={{ width: '28em' }}>
                <div className="container">
                    <h3 style={{ textAlign: "center" }}>עדכון סטאטוס</h3>
                    <hr></hr>
                    <div>
                    </div>
                    {StatusList.GetStatusList().map(status =>
                        <div className="row">
                            <div className="col-md-12">
                                <div>
                                    <div className="custom-controls-stacked d-block my-3" dir="rtl">
                                        <label className="custom-control material-checkbox" >
                                            <input checked={this.isExists(status)} dir="ltr" id={'status_' + status.key} type="checkbox" onChange={() => this.handleStatusClick(status)} className="material-control-input" ></input>
                                            <span className="material-control-indicator"></span>
                                            <span className="material-control-description">{status.value}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <br></br>
                    {/* <div className='row'>
                        <div className='col-md-12'>
                            <LinearDeterminate statusDeleted={this.state.statusDeleted} modalIsOpened={this.state.modalOpened} statusChecked={this.state.statusList}
                                statusLength={StatusList.GetStatusList().length}>
                            </LinearDeterminate>
                        </div>
                    </div> */}
                    {this.state.shoeResMsg ?

                        <div className="row">
                            <div className='col-md-12'>
                                <Alert variant="success" onClose={handleDismiss} dismissible>
                                    <Alert.Heading>{this.state.responseMsg}</Alert.Heading>
                                </Alert>
                            </div>
                        </div> : ''
                    }
                    <hr></hr>
                    <div className="row" style={{ textAlign: 'center' }}>
                        <div className="col-md-12">
                            <button style={{ borderRadius: '1em', borderColor: '#f7b742', backgroundColor: '#f7b742', 'width': '10em', 'fontWeight': 'bold' }} className="btn btn-secondary"
                                onClick={this.saveStatusProcess} >
                                שמירה
                            </button>
                        </div>
                    </div>
                </div>
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



    render() {
        return (
            this.ProccessModal()
        )
    }
}
