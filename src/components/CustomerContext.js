import React,{useState , createContext} from 'react';
import {Api} from './Api';


export const CustomerContext = createContext();



export const CustomerProvider= props =>{
    console.log('GetCustomersData',Api.GetCustomersData);
 
    const [customers,setCustomers]=useState(Api.GetCustomersData);

    return(
        <CustomerContext.Provider value={[customers,setCustomers]}>{props.children}</CustomerContext.Provider>
    );
}