import React from "react";
import {Avatar} from "../../_shared/components/uiElements/Avatar";
import {Link} from "react-router-dom";
import { Card } from "../../_shared/components/layout/Card";

export const UserItem: React.FC<PropsT> = (props) => {

    const {
        id,
        name,
        image,
        placeCount
    } = props

    return (
        <li>
            <Link to={`/${id}/places`}>
                <Card>
                    <div>
                        <Avatar src={image} alt=""/>
                    </div>
                    <div>
                        <h2>{name}</h2>
                        <h3>{placeCount === 1 ? 'Place: ' : 'Places: '} {placeCount}</h3>
                    </div>
                </Card>
            </Link>
        </li>
    )
}

// Types
type PropsT = {
    id: string
    name: string
    image: string
    placeCount: number
}