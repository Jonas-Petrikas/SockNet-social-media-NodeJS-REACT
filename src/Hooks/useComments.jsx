import { useEffect, useReducer, useState } from 'react';
import * as C from '../Constants/main.js';
import * as A from '../Constants/actions.js';
import axios from 'axios';

import commentsReducer from '../Reducers/CommentsReducer.js';

export default function useComments() {

    /*

    [
     {id:5, c:[]},
     {id:14, c:[]},
     {id:57, c:[]}
    
    
    ]


    */

    const [comments, dispatchComments] = useReducer(commentsReducer, []); //aprašytas state

    const [com, setCom] = useState(null);
    const revertSmiles = content => {
        C.smiles.forEach(s => {
            content = value.replace(s[0], s[1])
        })
        return content;

    }

    useEffect(_ => {
        if (com === null) {
            return
        }
        axios.post(C.SERVER_URL + 'comments/create' + com.postID, { content: revertSmiles(com.content) }, { withCredentials: true })
    }, [com])

    const getCommentsFromServer = postID => {
        axios.get(C.SERVER_URL + 'comments/for-post/' + postID, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                dispatchComments({
                    type: A.LOAD_POST_COMMENTS,
                    payload: {
                        postID,
                        comments: res.data.c
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return { comments, dispatchComments, getCommentsFromServer };

}