import { useContext } from "react"
import Auth from "../../Contexts/Auth";
import Data from "../../Contexts/Data";
import * as A from '../../Constants/actions'

export default function CommentInPostList({ comment, post }) {

    const { user } = useContext(Auth);
    const { dispatchComments, deleteCommentsFromServer } = useContext(Data);

    const deleteComment = _ => {
        dispatchComments({
            type: A.DELETE_POST_COMMENT,
            payload: {
                commentID: comment.id,
                postID: post.id


            }
        });
        deleteCommentsFromServer(comment.id);
    }

    const deleteCommentAdmin = _ => {
        dispatchComments({
            type: A.DELETE_POST_COMMENT,
            payload: {
                commentID: comment.id,
                postID: post.id


            }
        });
        deleteCommentsFromServer(comment.id, true);
    }


    return (
        <div className="posts-list__post__comments__comment">
            <div className="posts-list__post__comments__comment__top">
                <span className="posts-list__post__comments__comment__top__name">{comment.name} </span>
                <span className="posts-list__post__comments__comment__top__date">{comment.created_at.split('T')[0]} </span>
            </div>
            <div className="posts-list__post__comments__comment__content">
                {comment.content}

            </div>
            {
                user.id === comment.userID &&
                <div className="posts-list__post__comments__comment__delete">
                    <button type='button' onClick={deleteComment}>delete</button>
                </div>

            }
            {
                user.role === 'admin' &&
                <div className="posts-list__post__comments__comment__admin-delete">
                    <button type='button' onClick={deleteCommentAdmin}>💪 admin-delete</button>
                </div>

            }

        </div>

    )
}