import React, { Component } from '../../node_modules/react';
import axios from '../../node_modules/axios';
import Alert from '../../node_modules/react-bootstrap/Alert';
import { Link } from '../../node_modules/react-router-dom';

// const queryString = require('query-string');
export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isSelected:false,
            uploaded: true,
            show: false,
            msg: ''
        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            isSelected:true
        })
    }

    onClickHandler = () => {
        const fileData = new FormData();
        // if (Object.entries(fileData).length !== 0 && fileData.constructor === Object) {
            fileData.append('file', this.state.selectedFile, this.state.selectedFile.name);
            axios.post("http://localhost:4000/customers/upload", fileData)
                .then(res => { // then print response status
                    this.setState({
                        uploaded: true,
                        show: true,
                        msg: res.data
                    });

                });
        // }
    }

    componentDidMount() {
        axios.post("http://localhost:4000/customers/get-id", { cid: this.props.match.params.id })
            .then(res => { // then print response status
                console.log(res);
            });
    }


    render() {
        const handleDismiss = () => this.setState({ show: false });
        return (
            <div className="container">
                <h1 style={{ textAlign: 'center' }}>העלאת מסמכי לקוח</h1>
                <br></br>
                <span style={{ float: "left" }}> <Link to={"/edit/" + this.props.match.params.id}> לתיק לקוח</Link> </span>
                <br></br>
                <hr></hr>
                <div style={{ width: '50%', right: '18em' }} className="input-group">
                    <div className="form-group files">
                        <button type="button" className="btn btn-dark" onClick={this.onClickHandler}>העלאה</button>
                    </div>
                    <div className="custom-file">
                        <input type="file" name="file"  onChange={this.onChangeHandler}
                            className="custom-file-input" />
                        <label className="custom-file-label" >{this.state.isSelected == true ? this.state.selectedFile.name : 'בחר מסמך'}</label>
                    </div>
                </div>
                {
                    this.state.show === true ?
                        <Alert style={{ width: '22em', right: '25em' }} variant="success" onClose={handleDismiss} dismissible>
                            <Alert.Heading>{this.state.msg}</Alert.Heading>
                        </Alert> : ''
                }


            </div>

        )
    }
}

