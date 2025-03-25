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