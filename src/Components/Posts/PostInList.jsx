import { useContext, useState } from 'react';
import Data from '../../Contexts/Data';
import Auth from '../../Contexts/Auth';
import * as A from '../../Constants/actions.js';
import * as C from '../../Constants/main.js';
import CommentInPostList from './CommentInPostList.jsx';

export default function PostInList({ post }) {
    const { dispatchPosts, setPostUpdate, getCommentsFromServer, comments, dispatchComments } = useContext(Data);
    const { user } = useContext(Auth);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');

    const voteCounter = _ => {
        return post.votes.l.length - post.votes.d.length;
    }

    const userVote = type => {
        if (!user.id) {
            return null;
        }
        if (type === 'up') {
            return post.votes.l.includes(user.id) ? '#ffd700' : null;
        }
        return post.votes.d.includes(user.id) ? '#ffd700' : null;
    }

    const upVote = _ => {
        if (!user.id) {
            return;
        }
        setPostUpdate({
            id: post.id,
            type: 'up_vote',
        });
        dispatchPosts({
            type: A.UP_VOTE_POST,
            payload: { user, post }
        });
    }

    const getComments = _ => {
        if (!showComments) {
            if (!comments.some(c => c.id === post.id)) {
                getCommentsFromServer(post.id);
                setShowComments(s => !s);

            } else {
                dispatchComments({
                    type: A.SHOW_POST_COMMENTS,
                    payload: {
                        postID: post.id
                    }
                });
                setShowComments(s => !s)

            }

        } else {
            dispatchComments({
                type: A.HIDE_POST_COMMENTS,
                payload: {
                    postID: post.id
                }
            });
            setShowComments(s => !s)
        }

    };

    const handleComment = e => {
        let value = e.target.value;
        C.smiles.forEach(s => {
            value = value.replace(s[0], s[1])
        })
        setComment(value);

    }

    const downVote = _ => {
        if (!user.id) {
            return;
        }
        setPostUpdate({
            id: post.id,
            type: 'down_vote',
        })
        dispatchPosts({
            type: A.DOWN_VOTE_POST,
            payload: { user, post }
        });
    }

    return (
        <li className="posts-list__post">
            <div className="posts-list__post__top">
                <div className="posts-list__post__top__avatar">
                    <img src={post.avatar} alt={post.name} />
                </div>
                <div className="posts-list__post__top__user">{post.name}</div>
                <div className="posts-list__post__top__date">{post.postDate.split('T')[0]}</div>
            </div>
            <div className="posts-list__post__image">
                <img src={post.mainImage} alt="post image" />
            </div>
            <div className="posts-list__post__content">
                {post.content}
            </div>
            <div className="posts-list__post__bottom">
                <div className="posts-list__post__bottom__counter">
                    <div className="up" onClick={upVote} style={{ color: userVote('up') }}>⬆</div>
                    <div className="count">{voteCounter()}</div>
                    <div className="down" onClick={downVote} style={{ color: userVote('down') }}>⬇</div>
                </div>
                <div className="posts-list__post__bottom__show-comments">
                    <span onClick={getComments}>{showComments ? 'Hide comments' : 'Show comments'}</span>
                </div>
            </div>
            <div className="posts-list__post__write-comment">
                <textarea onChange={handleComment} value={comment}></textarea>
                <button>Send</button>

            </div>
            {
                comments.some(p => p.id === post.id && p.show) && (
                    <div className="posts-list__post__bottom__comments">
                        {
                            comments.find(p => p.id === post.id).c
                                .map(comment => <CommentInPostList key={comment.id} comment={comment} />)
                        }
                    </div>
                )
            }
        </li>
    )
};