import React, { Component } from '../../node_modules/react';
import axios from '../../node_modules/axios';
import { Link, Router, Route, withRouter,Switch } from '../../node_modules/react-router-dom';
import Modal from '../../node_modules/react-modal';
import DocsUpload from "./docs-upload.component";
import AppointmentModal from './AppointmentModal';
import ProductionReceipt from './ProductionReceipt';
import PowerAttorney from './PowerAttorney';
// import EventsTable from './EventsTable';
import $ from '../../node_modules/jquery';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

//--->button > edit > start	
$(document).on('click', '.btn_edit', function (event) {
    event.preventDefault();
    var tbl_row = $(this).closest('tr');

    tbl_row.find('.btn_save').show();
    tbl_row.find('.btn_cancel').show();

    //hide edit button
    tbl_row.find('.btn_edit').hide();
    tbl_row.find('.btn_delete').hide();

    //make the whole row editable
    tbl_row.find('.row_data')
        .attr('contenteditable', 'true')
        .attr('edit_type', 'button')
        // .addClass('bg-warning')
        .css('padding', '3px')
        .css('white-space', ' pre-wrap')
        .css('box-shadow', '-1px 2px 4px 2px #ccc')

    //--->add the original entry > start
    tbl_row.find('.row_data').each(function (index, val) {
        //this will help in case user decided to click on cancel button
        $(this).attr('original_entry', $(this).html());
    });
    //--->add the original entry > end

});
//--->button > edit > end



//--->button > cancel > start	
$(document).on('click', '.btn_cancel', function (event) {
    event.preventDefault();

    var tbl_row = $(this).closest('tr');

    //hide save and cacel buttons
    tbl_row.find('.btn_save').hide();
    tbl_row.find('.btn_cancel').hide();

    //show edit button
    tbl_row.find('.btn_edit').show();
    tbl_row.find('.btn_delete').show();

    //make the whole row editable
    tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        //  .removeClass('bg-warning')
        .css('box-shadow', '')


    tbl_row.find('.row_data').each(function (index, val) {
        $(this).html($(this).attr('original_entry'));
    });
});
//--->button > cancel > end

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            success: false,
            showListFiles: false,
            listOfFiles: [],
            _id: '',
            comments: '',
            commentsArr: [],
            showComments: false,
            modalIsOpen: false,
            prodReceiptModalIsOpen: false,
            PowerAttorneyIsOpen: false,
            toEdit: false,
            accsessBtnSave: false,
            eventDate: '',
            eventType: '',
            details: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openProductionReceipt = this.openProductionReceipt.bind(this);
        this.closeProductionReceipt = this.closeProductionReceipt.bind(this);

        this.openPowerAttorney = this.openPowerAttorney.bind(this);
        this.closePowerAttorney = this.closePowerAttorney.bind(this);



    }

    openModal() {
        this.setState({
            modalIsOpen: true,
            showComments: false
        });

    }

    openProductionReceipt() {
        this.setState({
            prodReceiptModalIsOpen: true,
        });
    }
    closeProductionReceipt() {
        this.setState({
            prodReceiptModalIsOpen: false,
        });
    }
    openPowerAttorney() {
        this.setState({
            PowerAttorneyIsOpen: true,
        });
    }
    closePowerAttorney() {
        this.setState({
            PowerAttorneyIsOpen: false,
        });
    }


    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    showListFiles = () => {
        if (this.state.showListFiles === false) {
            this.setState({ showListFiles: true });
            this.getListFiles();
        } else {
            this.setState({ showListFiles: false });
        }
    }
    showComments = () => {
        if (this.state.showComments === false) {

            this.setState({ showComments: true, toEdit: false });
            this.getComments();

        } else {
            this.setState({ showComments: false });
        }
    }

    mergeFilesListAndTimeUpload(filesList, filesTimeUpload) {
        var correctArrayFiles = [];
        // debugger;
        for (let fileIndex in filesList) {
            for (let i in filesTimeUpload) {
                if (fileIndex === i) {
                    correctArrayFiles.push({ fileName: filesList[fileIndex], uploadTime: filesTimeUpload[i] });
                }

            }
        }
        return correctArrayFiles;

    }
    getListFiles() {
        axios.get("http://localhost:4000/customers/getListFiles/" + this.props.match.params.id, { id: this.props.match.params.id })
            .then(res => { // then print response status
                console.log(res);
                var filesList = this.mergeFilesListAndTimeUpload(res.data.filesList, res.data.filesTimeUpload);
                console.log('filesList', filesList);
                this.setState({ listOfFiles: filesList });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getComments() {
        axios.get("http://localhost:4000/customers/getComments/" + this.props.match.params.id, { id: this.props.match.params.id })
            .then(res => { // then print response status
                console.log(res.data);
                this.setState({ commentsArr: this.ignoreBreakRows(res.data) });
                // this.setState({ commentsArr: res.data });
                $(document).find('.btn_save').hide();
                $(document).find('.btn_cancel').hide();
            })
            .catch(err => {
                console.log(err);
            });
    }

    mapFiles() {
        return this.state.listOfFiles.map((file, i) => {
            return (
                <tr key={i}>
                    <td><a key={i} download href={"/../../uploads/" + this.props.match.params.id + '/' + file.fileName}>{file.fileName} <br></br></a>
                    </td>
                    <td>{file.uploadTime}</td>
                </tr>
            )
        });

    }

    filesList() {
        if (!this.state.listOfFiles.length) {
            return false;
        }

        return (
            <table className="table table-hover" style={{ textAlign: '-webkit-right', width: 'auto' }}>
                <thead>
                    <tr>
                        <th>שם קובץ</th>
                        <th> תאריך העלאת קובץ</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mapFiles()}
                </tbody>
            </table>
        )
    }


    commentsList() {
        if (!this.state.commentsArr.length) {
            return false;
        }
        return (
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>תאריך</th>
                        <th>סוג פגישה</th>
                        <th>פרטי האירוע</th>
                        <th></th>
                    </tr>
                </tbody>
                <tbody>
                    {this.mapComments()}
                </tbody>
            </table>
        )
    }

    mapComments = () => {
        return this.state.commentsArr.map((comment, i) => {
            var row_id = comment.eventID.toString();
            return (
                <tr key={i} id={'row_id_' + row_id}>
                    <td> {i + 1}</td>
                    <td><div className="row_data" edit_type="click" id={'eventDate_' + comment.eventID.toString()} onChange={this.handleCommentsChange.bind(this)}>{this.convertDate(comment.eventDate)}</div></td>
                    <td><div style={{ maxWidth: '230px' }} className="row_data" id={'eventType_' + comment.eventID.toString()} value={comment.eventType} onChange={this.handleCommentsChange.bind(this)} >{comment.eventType}</div></td>
                    <td><div style={{ maxWidth: '35em', whiteSpace: 'pre-wrap', textAlign: 'right' }} className="row_data" edit_type="click" id={'details_' + comment.eventID.toString()} onChange={this.handleCommentsChange.bind(this)}>{comment.details}</div></td>
                    <td style={{ display: 'inline-flex' }}>
                        <span className="btn_edit"><button className="btn btn-secondary"><a className="btn btn-link" id={comment.eventID.toString()} >עריכה</a></button></span>
                        <span className="btn_delete"><button style={{ marginInlineStart: '1em' }} onClick={this.deleteEditableEvent.bind(this, row_id)} className="btn btn-secondary"><a className="btn btn-link" id={comment.eventID.toString()}>מחיקה</a></button></span>
                        <span className="btn_save" id={'btn_' + comment.eventID.toString()} onClick={this.saveEditableEvent.bind(this, row_id)}><button className="btn btn-secondary"><a className="btn btn-link" >שמירה</a></button></span>
                        <span className="btn_cancel"><button style={{ marginInlineStart: '1em' }} className="btn btn-secondary"><a className="btn btn-link" id={comment.eventID.toString()}>ביטול</a></button></span>
                    </td>
                </tr>
            )
        });
    }

    buildEditableEventObj(row_data, btn_id) {
        let editableEvent = {};

        for (let i = 1; i < 4; i++) {
            if (i === 1) editableEvent.eventDate = row_data[i].getElementsByClassName('row_data')[0].innerHTML;
            if (i === 2) editableEvent.eventType = row_data[i].getElementsByClassName('row_data')[0].innerHTML;
            if (i === 3) editableEvent.details = row_data[i].getElementsByClassName('row_data')[0].innerHTML;
            row_data[i].getElementsByClassName('row_data')[0].setAttribute('contenteditable', 'false');

            editableEvent._id = btn_id;
            editableEvent.customer_id = this.state._id;
            editableEvent.eventID = btn_id;

        }
        return editableEvent;

    }

    deleteEditableEvent = (btn_id, row_id) => {
        let row_data = document.getElementById('row_id_' + btn_id).cells;

        let editableEvent = this.buildEditableEventObj(row_data, btn_id);
        let arrOfEvents = this.state.commentsArr;
        for (let i in arrOfEvents) {

            if (arrOfEvents[i].eventID == editableEvent._id) {
                arrOfEvents.splice(i, 1);
                this.setState({
                    commentsArr: arrOfEvents
                });
            }
        }
        this.deleteEvent(this.state.commentsArr);
    }

    deleteEvent(editableEvent) {
        axios.post('http://localhost:4000/customers/deleteEvent/' + this.state._id, editableEvent)
            .then(res => {
                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    saveEditableEvent = (btn_id, row_id) => {
        let row_data = document.getElementById('row_id_' + btn_id).cells;

        let editableEvent = this.buildEditableEventObj(row_data, btn_id);
        this.uploadEvent(editableEvent);
        $(document).find('.btn_save').hide();
        $(document).find('.btn_cancel').hide();
        $(document).find('.btn_edit').show();
        $(document).find('.btn_delete').show();
        $(document).find('.row_data').css('box-shadow', '');
    }

    uploadEvent(editableEvent) {
        console.log('uploadEvent', editableEvent);
        axios.post('http://localhost:4000/customers/uploadEvent/' + this.state._id, editableEvent)
            .then(res => {
                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleCommentsChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });

    }


    onEditEvent = (e) => {
        this.setState({
            toEdit: true, accsessBtnSave: true
        })
        // if (this.state.accsessBtnSave == true) {
        //     this.onSaveBtn();
        // }
    }
    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSaveBtn() {
        const newEvent = {
            eventDate: this.state.eventDate,
            details: this.state.details,
            eventTime: this.state.eventTime,
            eventType: this.state.eventType,
            _id: this.state._id
        };
        axios.post('http://localhost:4000/customers/addEvent/' + this.state._id, newEvent)
            .then(res => {
                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit = (e) => {
        const commentsObj = {
            comments: this.state.comments,
            _id: this.state._id
        }
        axios.post('http://localhost:4000/customers/addComments/' + this.state._id, commentsObj)
            .then(res => {

                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    ignoreBreakRows(events) {
        let eventString;
        let eventsArray = events;
        for (let key in events) {
            eventString = events[key].details;

            if (eventString.length > 0) {
                for (let i = 0; i <= eventString.length; i++) {
                    if (
                        (eventString.charAt(i) == "<" &&
                            eventString.charAt(i + 1) === "d" &&
                            eventString.charAt(i + 2) === "i" &&
                            eventString.charAt(i + 3) === "v" &&
                            eventString.charAt(i + 4) === ">"
                        )
                        ||
                        (eventString.charAt(i) == "&" &&
                            eventString.charAt(i + 1) === "n" &&
                            eventString.charAt(i + 2) === "b" &&
                            eventString.charAt(i + 3) === "s" &&
                            eventString.charAt(i + 4) === "p" &&
                            eventString.charAt(i + 5) === ";"
                        )
                        ||
                        (
                            eventString.charAt(i) == "<" &&
                            eventString.charAt(i + 1) == "b" &&
                            eventString.charAt(i + 2) == "r" &&
                            eventString.charAt(i + 3) == ">"
                        )
                    ) {
                        eventString = eventString.replace(String("<div>"), " ");
                        eventString = eventString.replace(String("<br>"), '\n');
                        eventString = eventString.replace(String("&nbsp;"), " ");
                    }
                    else if (eventString.charAt(i) == "<" &&
                        (eventString.charAt(i + 1) == "/" &&
                            eventString.charAt(i + 2) == "d" &&
                            eventString.charAt(i + 3) == "i" &&
                            eventString.charAt(i + 4) == "v" && eventString.charAt(i + 5) == ">")
                    ) {
                        eventString = eventString.replace(String("</div>"), " ");
                    }

                    if (i == eventString.length - 1) {
                        eventsArray[key].details = eventString;
                    }

                }
            }



        }

        return eventsArray;

    }

    componentDidMount() {
        axios.get("http://localhost:4000/customers/getId/" + this.props.match.params.id, { id: this.props.match.params.id })
            .then(res => { // then print response status
                this.setState({ obj: res.data });
                if (res.data && res.data.event) {
                    this.setState({ commentsArr: this.ignoreBreakRows(res.data.event) });

                }
                this.setState({ _id: this.props.match.params.id });
            }).then(

                this.success = true,
            )
            .catch(err => {
                console.log(err);
            });
    }

    convertDate(date) {
        if (date == undefined || date == '') return '';
        var from = date.split("-");
        console.log(from);
        date = from[2] + '/' + from[1] + '/' + from[0];
        return date;
    }

    customerData() {

        if (this.success == true) {
            return (
                <div className="container-fluid">
                    <div style={{ boxShadow: '-1px 2px 4px 2px #ccc' }}>
                        <div className="row">
                            <div className="col-md-12">
                                <h3><b></b>כרטיס לקוח של : {this.state.obj.fullName}</h3>
                                <span style={{ float: "left" }}> <Link to={"/docs/" + this.state.obj._id}>העלאת מסמכים  </Link><i className="fa fa-upload" aria-hidden="true"></i> </span>
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
                                <label>תאריך הנפקת ת.ז: <b>{this.convertDate(this.state.obj.issueDate)}</b> </label>
                            </div>
                            <div className="col-md-3">
                                <label>תאריך לידה: <b>{this.convertDate(this.state.obj.date)}</b> </label>
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
                                <label> רחוב: <b>{this.state.obj.address.houseAddress ? this.state.obj.address.houseAddress : ''}</b> </label>
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
                        <div className="row">
                            <div className="col-md-3">
                                <label> סוג פעילות: <b>{this.state.obj.actionType.split("-")[1]}</b> </label>
                            </div>
                            <div className="col-md-3">
                                <label> מצב משפחתי: <b>{this.state.obj.matiralStatus}</b> </label>
                            </div>
                            <div className="col-md-3">
                                <label>מקור הגעה: <b>{this.state.obj.sourceArrival}</b> </label>
                            </div>
                            <div className="col-md-3">
                                <label>גיל: <b>{this.state.obj.age}</b> </label>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-3">
                                <button style={{ borderRadius: '1em', borderColor: '#f7b742', backgroundColor: '#f7b742', 'width': '10em', 'fontWeight': 'bold' }} className="btn btn-secondary"
                                    onClick={this.openModal}>
                                    אירוע חדש
                            </button>
                            </div>
                            <div className="col-md-3">
                                <button style={{ borderRadius: '1em', borderColor: '#f7b742', backgroundColor: '#f7b742', 'width': '10em', 'fontWeight': 'bold' }} className="btn btn-secondary"
                                    onClick={this.openProductionReceipt}>
                                    הפקת קבלה
                            </button>
                            </div>
                            <div className="col-md-3">
                                <button style={{ borderRadius: '1em', borderColor: '#f7b742', backgroundColor: '#f7b742', 'width': '10em', 'fontWeight': 'bold' }} className="btn btn-secondary"
                                    onClick={this.openPowerAttorney}>
                                    הפקת ייפוי כח
                            </button>
                            </div>

                        </div>

                        <Modal onRequestClose={this.closeModal}
                            style={customStyles}
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}>
                            <AppointmentModal id={this.state.obj._id}></AppointmentModal>
                        </Modal>
                        <Modal onRequestClose={this.closeProductionReceipt}
                            style={customStyles}
                            isOpen={this.state.prodReceiptModalIsOpen}>
                            <ProductionReceipt state={this.state} id={this.state.obj._id}></ProductionReceipt>
                        </Modal>
                        <Modal onRequestClose={this.closePowerAttorney}
                            style={customStyles}
                            isOpen={this.state.PowerAttorneyIsOpen}>
                            <PowerAttorney state={this.state} id={this.state.obj._id}></PowerAttorney>
                        </Modal>
                        <br></br>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-12">
                                <label onClick={this.showListFiles} style={{ float: "right", cursor: "pointer" }}> <b> הצגת קבצי לקוח  <i className="fa fa-files-o" aria-hidden="true"></i> </b></label>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row" id="" style={this.state.showListFiles == false ? { display: "none" } : { display: "block" }}>
                            <div className="col-md-12">

                                {this.filesList()}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-12">
                                <label onClick={this.showComments} style={{ float: "right", cursor: "pointer" }}> <b> הסטוריית אירועים  <i className="fa fa-files-o" aria-hidden="true"></i> </b></label>
                            </div>

                        </div>
                        <div className="row" id="" style={this.state.showComments == false ? { display: "none" } : { display: "block" }}>
                            <div className="col-md-12">

                                {this.commentsList()}
                            </div>

                        </div>
                        <hr></hr>
                    </div>
                </div>
            );
        }
    }

    render() {

        return (
            <Switch>
                <div style={{ direction: "rtl", textAlign: "center", width: '80%', marginRight: '18em' }} className="form-fields">
                    {
                        this.customerData()
                    }
                </div>
                <Route path="/docs/:id" exact component={DocsUpload} />

            </Switch>
        )
    }
}

// export default withRouter(Sidebar);

