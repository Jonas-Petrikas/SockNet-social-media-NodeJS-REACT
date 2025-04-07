import { useContext } from "react"
import { ChatData } from "../../Pages/Chat";

export default function ChatList() {

    const { chat, dispatchChat, showChat, setShowChat } = useContext(ChatData);

    console.log(chat);

    return (
        <div className="bin bin-30">
            <h2>Conversations:</h2>
            <ul className="chat-list">
                {
                    chat && chat.chatList.map(user =>
                        <li key={user.id} className="chat-list__user">
                            <div className="chat-list__user__avatar">
                                <img src={user.avatar} alt={user.name}></img>
                            </div>
                            <div className="chat-list__user__name" onClick={_ => setShowChat(user)}>
                                {user.name}
                            </div>
                        </li>
                    )
                }

            </ul>

        </div>

    )

}