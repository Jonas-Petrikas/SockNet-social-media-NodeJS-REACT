export default function UserInList({ user }) {


    const makeColor = _ => {
        if (user.online) {
            if (user.userRole !== 'gold') {
                if (user.userRole === 'admin') {
                    return 'IndianRed';
                }
                return 'forestgreen';
            }
            return 'gold';
        }
        return 'grey';
    }
    return (
        <li className="users-list__user">
            <div className="users-list__user__role">[{user.userRole}]</div>
            <div className="users-list__user__name" style={{
                color: makeColor()
            }}>{user.name} </div>

            <div className="users-list__user__avatar">
                <img src={user.avatar} alt={user.name} />
            </div>
        </li>
    );
}