import { useEffect, useReducer } from 'react';
import * as C from '../Constants/main.js';
import * as A from '../Constants/actions.js';
import axios from 'axios';

import postsReducer from '../Reducers/postsReducer.js';

export default function usePosts() {

    const [posts, dispatchPosts] = useReducer(postsReducer, null); //aprašytas state

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'posts/load-posts/1')
            .then(res => {
                // console.log(res.data.db) //iš serverio gauti post duomenys
                //action yra objektas
                dispatchPosts({
                    type: A.LOAD_POSTS_FROM_SERVER, //tipas - ką daryti
                    payload: res.data.db //payloadas su kuo tai daryt
                })
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return { posts, dispatchPosts }


}