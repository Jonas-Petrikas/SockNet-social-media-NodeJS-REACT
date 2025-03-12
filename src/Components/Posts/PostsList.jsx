import { useContext } from "react";
import PostInList from "./PostInList";
import Data from "../../Contexts/Data";


export default function PostsList() {

    const { posts } = useContext(Data);

    if (posts === null) {
        return (
            <div className="bin bin-30">
                <h1>Siunčiami įrašai...</h1>

            </div>

        )

    }

    return (
        <div className="bin bin-70">
            <h1>Sock-Net</h1>
            <ul className="posts-list">
                {
                    posts.map(p => <PostInList key={p.id} post={p} />)
                }

            </ul>


        </div>

    )

}