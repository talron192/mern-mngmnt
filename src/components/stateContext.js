import React, { useState, createContext } from 'react'

export const StateContext = createContext();

export const StateProvider = props => {
    var value = 'hello';

    return (
        <div>
            <StateContext.Provider value={'Hello'}>
                {props.children}
            </StateContext.Provider>
        </div>
    )
}