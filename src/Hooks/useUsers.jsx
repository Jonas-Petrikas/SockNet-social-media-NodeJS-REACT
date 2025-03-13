import { useEffect, useReducer } from 'react';
import * as C from '../Constants/main.js';
import * as A from '../Constants/actions.js';
import axios from 'axios';
import usersReducer from '../Reducers/usersReducer.js';

export default function useUsers() {


    const [users, dispatchUsers] = useReducer(usersReducer, null); //aprašytas state
    console.log('use users', 'users:', users?.length)

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'users/active-list')
            .then(res => {
                // console.log(res.data.db) //iš serverio gauti users duomenys
                //action yra objektas
                dispatchUsers({
                    type: A.LOAD_ACTIVE_USERS_FROM_SERVER, //tipas - ką daryti
                    payload: res.data.db //payloadas su kuo 
                })
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return { users, dispatchUsers }


}