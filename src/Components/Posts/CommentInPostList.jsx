export default function CommentInPostList({ comment }) {

    return (
        <div className="posts-list__post__comments__comment">
            <div className="posts-list__post__comments__comment__top">
                <span className="posts-list__post__comments__comment__top__name">{comment.name} </span>
                <span className="posts-list__post__comments__comment__top__date">{comment.created_at.split('T')[0]} </span>
            </div>
            <div className="post-list__post__comments__comment__content">
                {comment.content}

            </div>
        </div>

    )
}