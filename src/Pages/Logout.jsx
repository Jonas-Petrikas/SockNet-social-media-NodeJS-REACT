import { useContext, useEffect } from 'react';
import * as C from '../Constants/main';
import { useNavigate } from 'react-router';
import Auth from '../Contexts/Auth';
import axios from 'axios';


export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(Auth);

    useEffect(_ => {
        axios.post(C.SERVER_URL + 'logout', {}, { withCredentials: true })
            .then(res => {
                //TO DO ADD MESSAGE HERE
                setUser(res.data.user);
                navigate(C.GO_AFTER_LOGOUT);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);
    return (
        <span>Logging out...</span>
    )
}