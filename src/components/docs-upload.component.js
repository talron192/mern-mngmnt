import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
// const queryString = require('query-string');
export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploaded: true,
            show:false,
            msg: ''
        }

    }

    onChangeHandler = event => {
        console.log(event.target.files[0]);

        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    onClickHandler = () => {
        const fileData = new FormData();
        fileData.append('file', this.state.selectedFile, this.state.selectedFile.name);
        axios.post("http://localhost:4000/customers/upload", fileData)
            .then(res => { // then print response status
                console.log(res);
                this.setState({
                    uploaded:true,
                    show:true,
                    msg: res.data
                });

            });
    }

    componentDidMount() {
        axios.post("http://localhost:4000/customers/get-id", { cid: this.props.match.params.id })
            .then(res => { // then print response status
                console.log(res);
            });
        console.log('props', this.props.location.search);
    }


    render() {
        const handleDismiss = () => this.setState({ show: false });
        return (
            <div className="container">
                <h1 style={{ textAlign: 'center' }}>העלאת מסמכי לקוח</h1>
                <br></br>
                <hr></hr>
                <div style={{ width: '50%', left: '25%' }} className="input-group">
                    <div className="form-group files">
                        <button type="button" className="btn btn-dark" onClick={this.onClickHandler}>העלאה</button>
                    </div>
                    <div className="custom-file">
                        <input type="file" name="file" onChange={this.onChangeHandler}
                            className="custom-file-input" />
                        <label className="custom-file-label" >בחר מסמך</label>
                    </div>
                </div>
                {
                        this.state.show===true ? 
                        <Alert style={{width:'30%',left:'35%'}} variant="success" onClose={handleDismiss} dismissible>
                        <Alert.Heading>{this.state.msg}</Alert.Heading>
                      </Alert> : ''
                    }
               
                 
            </div>

            ////////////////////////////////////////////////////////////
            // <div className="container">
            //     <div className="row">
            //         <div className="offset-md-3 col-md-6">
            //             <div className="form-group files">
            //                 <h1>העלאת מסמכי לקוח</h1>
            //                 <br></br>
            //                 <input type="file" name="file" onChange={this.onChangeHandler} />
            //             </div>
            //             <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

            //         </div>
            //     </div>
            // </div>
        )
    }
}

