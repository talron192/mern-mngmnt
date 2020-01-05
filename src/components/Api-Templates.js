 export default function sendEmailTemplate  ({handleChange,isDisabled,sendToEmail})  {
    return (
        <div>
            <div className="row">

                <div className="col-md-12" style={{ paddingTop: '1em' }}>
                    <input type="text" onChange={handleChange()} style={{ border: '0', borderBottom: '1px solid grey' }} className="form-control" placeholder="נושא" aria-label="Example text with button addon" aria-describedby="button-addon1" id="subject"></input>
                </div>
            </div>
            <div className="row">

                <div className="col-md-12" >

                    <div className="input-group mb-3" style={{ paddingTop: '2em' }} >
                        <div className="input-group-prepend" >
                            <button className="btn btn-outline-secondary" type="button" disabled={isDisabled} onClick={sendToEmail()}>
                                {isDisabled && <i className="fa fa-refresh fa-spin"></i>}
                                שלח
                    </button>
                        </div>
                        <input id="emailContent" type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" ></input>
                    </div>
                </div>
            </div>
        </div>
    )
}