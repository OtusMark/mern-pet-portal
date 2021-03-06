import React from "react";
import {UserItem} from "./UserItem";
import {UserT} from "../redux/users-reducer";
import {Card} from "../../../common/styles/layout/Card";

export const UsersList: React.FC<PropsT> = (props) => {

    const {
        users
    } = props

    if (users.length === 0) {
        return (
            <Card>
                <div>No users</div>
            </Card>
        )
    }

    return (
        <ul>
            {users.map(user => {
                return (
                    <UserItem key={user.id}
                              id={user.id}
                              name={user.name}
                              image={user.image}
                              petsCount={user.pets.length}/>
                )
            })}
        </ul>
    )
}

// Types
type PropsT = {
    users: Array<UserT>
}