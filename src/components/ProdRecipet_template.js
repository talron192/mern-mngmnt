import React from '../../node_modules/react';

export default class ProdRecipet_template extends React.Component {


    render() {
        return (
            <div id="ProdReceipt" className="container" style={{ position: "absolute", textAlign: "center" }}>
                <div style={{width:"93em"}}>
                    <h3>ייעוץ משכנתאות וכלכלת המשפחה</h3>
                    <div className="row" style={{ paddingBottom: " 1em" }}>
                        <div className="col-md-6" style={{ backgroundColor: "#af8686" }}>
                            <div className="row">
                                <div className="col-md-4" style={{ marginBottom: "0.7em" }}>
                                    מספר חשבונית : <strong>ReciepNum</strong>
                                </div>
                                <div className="col-md-4" style={{ marginBottom: "0.7em" }}>
                                    תאריך חשבונית :<strong> ReciepDate</strong>
                                </div>
                                <div className="col-md-4" style={{ marginBottom: "0.7em" }}>
                                    תאריך יעד : <strong>ReciepTarget</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ backgroundColor: "gray" }}>
                            <div className="row">
                                <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                                    רחוב : <strong>AgentAddress</strong>
                                </div>
                                <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                                    טלפון :<strong> Agent_Pnumber</strong>
                                </div>
                                <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                                    דואר אלקטורני : <strong>AgentEmail</strong>
                                </div>
                                <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                                    פקס : <strong>AgentFax</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{width:"93em" , backgroundColor: "aliceblue", paddingBottom: "1em" }}>
                    <div className="row">
                        <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                            כתובת :<strong> {this.props.state.obj.address.houseAddress + this.props.state.obj.address.city }</strong>
                        </div>
                        <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                            פקס : <strong>{this.props.state.obj.fax}</strong>
                        </div>
                        <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                            דואר אלקטרוני:<strong> {this.props.state.obj.email}</strong>
                        </div>
                        <div className="col-md-3" style={{ marginBottom: "0.7em" }}>
                            איש קשר: <strong>{this.props.state.obj.fullName}</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4" style={{ marginBottom: "0.7em" }}>
                            לחיוב : <strong>{this.props.state.obj.fullName}</strong>
                        </div>
                        <div className="col-md-4" style={{ marginBottom: "0.7em" }}>
                            טלפון :<strong> {this.props.state.obj.phoneNumber}</strong>
                        </div>
                        <div className="col-md-4" style={{ marginBottom: "0.7em" }}>
                            חשבונית עבור : <strong>{this.props.state.obj.actionType}</strong>
                        </div>
                    </div>
                </div>
                <table id="customers" style={{width:"93em"}}>
                    <thead>
                        <tr>
                            <th>תאריך</th>
                            <th>תיאור</th>
                            <th>תעריף שעתי</th>
                            <th>שעות</th>
                            <th>תשלום קבוע</th>
                            <th>הנחה</th>
                            <th>סך הכל</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>prodReciept</td>
                            <td>{this.props.prodReciept.description}</td>
                            <td>PerHour</td>
                            <td>CountHours</td>
                            <td>FixedPayment</td>
                            <td>{this.props.prodReciept.discount}</td>
                            <td>{this.props.prodReciept.priceAfterDiscount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}













