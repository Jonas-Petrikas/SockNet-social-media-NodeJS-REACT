export default function UserInList({ user }) {
    const makeColor = _ => {
        if (user.role !== 'gold') {
            if (user.online) {
                return 'forestgreen';
            }
            return 'grey';
        }
        return 'gold';
    }
    return (
        <li className="users-list__user">
            <div className="users-list__user__role">[{user.role}]</div>
            <div className="users-list__user__name" style={{
                color: makeColor()
            }}>{user.name} </div>

            <div className="users-list__user__avatar">
                <img src={user.avatar} alt={user.name} />
            </div>
        </li>
    );
}