const initState = {
    customerData: {},
    msg: 'hello tal',
    fileIsExist:false
}

const sitesReducer = (state = initState, action) => {

    switch (action.type) {
        case "GET_CUSTOMER_DATA":
            state = { ...state, customerData: action.payload }
            break;

        case "GET_MSG":
            state = { ...state,msg: action.payload }

        case "FILE_IS_EXIST":
            state = {...state,fileIsExist: action.payload}
            console.log('siteReducer-FILE_IS_EXIST',state);
            break;

        default:
            break;
    }
    console.log('sitesReducer', state);
    return state;
}

export default sitesReducer;