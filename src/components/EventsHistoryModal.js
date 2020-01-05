import React, { Component } from '../../node_modules/react';
// import MaterialTable from "../../node_modules/material-table";
import ReactTable from "../../node_modules/react-table";
import "../../node_modules/react-table/react-table.css";
import axios from '../../node_modules/axios';


import './style.css';



export default class EventsHistoryModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
        list: [],
        showList: true,
        loading:Boolean,
        isInEditMode: false

    }
}

  editableCell = (value) => {
    return (
      <input value={value}  onChange= {()=>{
        return "1";
      }} />
    )
  }

  // getList=()=>{
  //   return this.state.list.map((comment, i) => {
  // }

  componentDidMount() {
    this.getComments();
}

getComments() {
  axios.get("http://localhost:4000/customers/getComments/" + this.props.id, { id: this.props.id })
      .then(res => { // then print response status
          console.log(res.data);
          this.setState({ list: res.data,loading:false  });
          // this.setState({ commentsArr: res.data });
      })
      .catch(err => {
          console.log(err);
      });
}

renderEditView =(value)=>{
  return (
    <div>
      <input type="test" defaultValue={value}>
      </input>
    </div>
  )
}

renderDefaultValue =(value)=>{
  return(
    <div onDoubleClick={this.changeEditMode}>
      {value}
    </div>
  )
}

changeEditMode=()=>{
  this.setState({
    isInEditMode : !this.state.isInEditMode
  })
}

  render(){


    const cols = [
      {
        Header: "#",
        accessor: "1",
        sortable: false,
        Cell: props => {
          
          return (
            this.state.isInEditMode ? this.renderEditView(props.value) :
            this.editableCell(props.value)
          )
        },
        style: {
          textAlign: "center",
          
        }
      },
      {
        Header: "תאריך",
        accessor: "eventDate",
        sortable: false,
        Cell: props => {
          
          return (
            this.state.isInEditMode ? this.renderEditView(props.value) :
            this.renderDefaultValue(props.value)
          )
        },
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "סוג פגישה",
        accessor: "eventType",
        Cell: props => {
          return (
            this.editableCell(props.value)
          )
        },
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "פרטי האירוע",
        accessor: "details",
        Cell: props => {
          return (
            this.editableCell(props.value)
          )
        },
        style: {
          textAlign: "center"
        }
      }

    ]
    return (

        <ReactTable
          columns={cols}
          data={this.state.list}
          filterable
          loading={false}
          noDataText={"אין נתונים"}
          defaultPageSize={10}
          style={{ fontSize: '20px', width: '80%', marginRight: '15em' }}
          loading={this.state.loading ? true : false}
        >
        </ReactTable>
    )
  }
}
