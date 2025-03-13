export default function UserInList({ user }) {
    return (
        <li className="users-list__user">
            <div className="users-list__user__role">[{user.role}]</div>
            <div className="users-list__user__name" style={{
                color: user.online ? 'green' : 'grey'
            }}>{user.name} </div>

            <div className="users-list__user__avatar">
                <img src={user.avatar} alt={user.name} />
            </div>
        </li>
    );
}