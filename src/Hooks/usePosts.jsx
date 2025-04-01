import { useEffect, useReducer, useState } from 'react';
import * as C from '../Constants/main.js';
import * as A from '../Constants/actions.js';
import axios from 'axios';

import postsReducer from '../Reducers/postsReducer.js';

export default function usePosts() {

    const [posts, dispatchPosts] = useReducer(postsReducer, null); //aprašytas state
    const [postUpdate, setPostUpdate] = useState(null);
    const [storePost, setStorePost] = useState(null);

    useEffect(_ => {
        if (null === storePost) {
            return;
        }
        axios.post(C.SERVER_URL + 'posts/new', storePost, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            });
    })

    useEffect(_ => {
        if (null === postUpdate) {
            return;
        }
        axios.post(C.SERVER_URL + 'posts/update/' + postUpdate.id, {
            type: postUpdate.type,
            payload: postUpdate.payload
        }, { withCredentials: true })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [postUpdate])

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

    return { posts, dispatchPosts, setPostUpdate, storePost, setStorePost }


}