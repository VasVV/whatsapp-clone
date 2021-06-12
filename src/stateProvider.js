import React, {useContext, useReducer} from 'react';
import userContext from './userContext';

export const StateProvider = ({
    reducer,
    initialState,
    children
}) => (
    <userContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </userContext.Provider>
)

export const useStateValue = () => useContext(userContext);