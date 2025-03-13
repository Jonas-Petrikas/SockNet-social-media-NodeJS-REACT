import { useContext } from "react";
import Data from '../../Contexts/Data'
import UserInList from "./UserInList";

export default function UsersList() {

    const { users } = useContext(Data); //users yra steitas
    // console.log(users);
    if (users === null) {
        return (
            <div className="bin bin-30">
                <h1>Siunčiami vartotojai...</h1>

            </div>

        )

    }

    return (
        <div className="bin bin-30">
            <h1>Sock-Net vartotojai:</h1>
            <ul className="users-list">
                {
                    users.map(u => <UserInList key={u.id} user={u} />)
                }

            </ul>


        </div>

    )
}