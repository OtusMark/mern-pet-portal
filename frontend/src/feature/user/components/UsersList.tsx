import React from "react";
import {UserItem} from "./UserItem";
import {UserT} from "../../../bll/reducers/user-reducer";
import {Card} from "../../../shared/components/layout/Card";

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
                              placeCount={user.places.length}/>
                )
            })}
        </ul>
    )
}

// Types
type PropsT = {
    users: Array<UserT>
}