import { useEffect, useReducer } from 'react';
import * as C from '../Constants/main.js';
import * as A from '../Constants/actions.js';
import axios from 'axios';
import chatReducer from '../Reducers/chatReducer.js';

export default function useChat() {

    /*
        chat
        {
        chatList: 
            [
                {id, name, avatar},
                {id, name, avatar},
                {id, name, avatar}
            ]
        messages: 
            [
                {id, [
                {text, time, id, type: "read"|"write" },
                {text, time, id, type: "read"|"write" },
                {text, time, id, type: "read"|"write" }
                ]},
                {id, [{messages}]},
                {id, [{messages}]},


            ]
        }
    */

    const [chat, dispatchChat] = useReducer(chatReducer, null); //aprašytas state

    const getChatMessages = userID => {
        axios.get(C.SERVER_URL + 'chat/chat-with/' + userID, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                dispatchChat(
                    {
                        type: A.LOAD_CHAT_MESSAGES,
                        payload: {
                            chatWith: userID,
                            messages: res.data.messages
                        }
                    }
                )
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'chat/list', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                dispatchChat({
                    type: A.LOAD_CHAT_USERS,
                    payload: res.data.users
                })
            })
            .catch(error => {
                console.log(error);


            })

    }, [])

    return { chat, dispatchChat, getChatMessages }
}