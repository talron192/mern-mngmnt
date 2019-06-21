import React, { Component, useContext } from 'react';
import axios from 'axios';
// import ImporterAPI from './Api';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";

// const API = new ImporterAPI()



// const Customer = props => (
//     <tr >
//         <td>{props.customer.fullName}</td>
//         <td>{props.customer._id}</td>
//         <td> <Link to={"/edit/" + props.customer._id}>העלאת מסמכים</Link></td>
//     </tr>
// )

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showDContent: true,
        }
        this.dataContect = this.dataContect.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/customers/get')
            .then(res => {
                this.setState({ list: res.data });
            })
            .catch(function (err) {
                console.log('error-componentMount', err);
            });
    }

    dataContect(event) {
        event.preventDefult();
    }

    customersList(showData) {
        return this.state.list.map(function (currentCustomer, i) {
            return (
                <tr >
                    <td>{currentCustomer.fullName}</td>
                    <td>{currentCustomer._id}</td>
                    {/* <td> <Link to={"/edit/" + props.customer.id}>העלאת מסמכים</Link></td> */}
                </tr>
            )
            });
    }
    render() {

        const { showDContent } = this.state.showDContent;

        const cols = [
            {
                Header: "שם מלא",
                accessor: "fullName",
                sortable: false,
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "תעודת זהות",
                accessor: "_id",
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "פעולות",
                Cell: props => {
                    return (
                        <Link to={"/edit/" + props.original._id}> תיק לקוח</Link>
                    )
                },
                style: {
                    textAlign: "center"
                },
                sortable: false,
                filterable: false,


            }
        ]

        return (
            
                <ReactTable
                    columns={cols}
                    data={this.state.list}
                    filterable
                    noDataText={"אין נתונים"}
                    defaultPageSize={10}
                >
                   
                </ReactTable>

        )

        // return <div>

        //     <table className="table table-hover">
        //         <thead>
        //             <tr >

        //                 <th scope="col">שם מלא</th>
        //                 <th scope="col">ת.ז</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {this.customersList()}

        //         </tbody>
        //     </table>
        // </div>
    }
}
