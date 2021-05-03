import React from "react";

export const UserItem: React.FC<PropsT> = (props) => {

    const {
        id,
        name,
        image
    } = props

    return (
        <div>Users list</div>
    )
}

// Types
type PropsT = {
    id: string
    name: string
    image: string
    placeCount: number
}