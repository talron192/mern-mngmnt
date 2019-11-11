import React,{useState , createContext} from '../../node_modules/react';
import {Api} from './Api';


export const CustomerContext = createContext();



export const CustomerProvider= props =>{
 
    const [customers,setCustomers]=useState(Api.GetCustomersData);

    return(
        <CustomerContext.Provider value={[customers,setCustomers]}>{props.children}</CustomerContext.Provider>
    );
}