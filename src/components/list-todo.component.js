import React, { Component } from '../../node_modules/react';
import axios from '../../node_modules/axios';
import { withGlobalState } from 'react-globally'
// import ImporterAPI from './Api';
import { Link, Router,Route,withRouter,Switch } from '../../node_modules/react-router-dom';
import ReactTable from "../../node_modules/react-table";
import EditTodo from "./edit-todo.component";


import "../../node_modules/react-table/react-table.css";


export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showDContent: true,
            showList: true,
            routOutFromDashBord: false

        }
        this.dataContect = this.dataContect.bind(this);
    }

    // componentDidUpdate (){
    //     console.log('componentDidUpdate ');
    //     if(this.state.showList == false){

    //         this.setState({showList:true});
    //     }
    // }
    componentDidMount() {
        console.log('componentDidMount', this.props);
        this.getCustomersData();
    }

    getCustomersData() {
        axios.get('http://localhost:4000/customers/get')
            .then(res => {
                let list = [];
                console.log(res.data);
                res.data.map(e => {
                    console.log(e);
                    if (e.actionType && e.actionType.split("-")[0] == this.props.props.authData.actionType) {
                        list.push(e);
                    }
                })
                this.setState({ list: list });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    dataContect(event) {
        event.preventDefult();
    }

    // customersList(showData) {
    //     return this.state.list.map(function (currentCustomer, i) {
    //         return (
    //             <tr >
    //                 <td>{currentCustomer.customer_id}</td>
    //                 <td>{currentCustomer.fullName}</td>
    //                 <td>{currentCustomer._id}</td>
    //             </tr>
    //         )
    //     });
    // }
    render() {

        const cols = [
            {
                Header: "מספר לקוח",
                accessor: "customer_id",
                sortable: false,
                style: {
                    textAlign: "center"
                }
            },
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
                        <Link style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }} to={"/edit/" + props.original._id} onClick={() => this.setState({ showList: false })} > תיק לקוח</Link>
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
            <Switch>

                    <ReactTable
                        columns={cols}
                        data={this.state.list}
                        filterable
                        noDataText={"אין נתונים"}
                        defaultPageSize={10}
                        style={{ fontSize: '20px', width: '80%', marginRight: '15em' }}
                    >
                    </ReactTable>
                <Route path="/edit/:id" exact component={EditTodo} />

            </Switch>
        )
    }
}
// export default withGlobalState(TodoList)
