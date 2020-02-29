import axios from '../../node_modules/axios';


export const getCustomerData = (customerId) => {
    return async (dispatch) => {
            
        axios.get("http://localhost:4000/customers/getId/" + customerId, { id: customerId })
        .then(res => { // then print response status
            console.log('getCustomerData',res);
            return dispatch({
                type: "GET_CUSTOMER_DATA",
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        });

    }
}



export const getMsg = (msg) => {
    return async (dispatch) => {
            
        return dispatch({
            type: "GET_MSG",
            payload: msg
        })

    }
}

export const fileIsExist=(fileData)=>{
    return async (dispatch)=>{

        axios.post("http://localhost:4000/customers/fileIsExist/" + fileData.customerId,fileData)
        .then(res => { // then print response status
            console.log('fileIsExist',res);
            return dispatch({
                type:"FILE_IS_EXIST",
                payload:res.data
            })
        })
        .catch(err => {
            console.log(err);
        });


    }
}