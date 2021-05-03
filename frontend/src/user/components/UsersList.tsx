import React from "react";
import {UserItem} from "./UserItem";
import {UserT} from "../../bll/bll";

export const UsersList: React.FC<PropsT> = (props) => {

    const {
        users
    } = props

    if (users.length === 0) {
        return (
            <div>No users</div>
        )
    }

    return (
        <div>
            {users.map(user => {
                return (
                    <UserItem key={user.id}
                              id={user.id}
                              name={user.name}
                              image={user.image}
                              placeCount={user.places}/>
                )
            })}
        </div>
    )
}

// Types
type PropsT = {
    users: Array<UserT>
}