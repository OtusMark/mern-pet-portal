import React from "react";
import {PlaceT} from "../../../bll/reducers/place-reducer";
import {Card} from "../../_shared/components/layout/Card";
import {Button} from "../../_shared/components/uiElements/Button";
import {PlaceItem} from "./PlaceItem";

export const PlaceList: React.FC<PropsT> = (props) => {

    const {
        places
    } = props

    if (places.length === 0) {
        return (
            <div>
                <Card>
                    <h2>No places found. Create new place</h2>
                    <Button>Share Place</Button>
                </Card>
            </div>
        )
    }

    return (
        <>
            {places.map(place => <ul><PlaceItem key={place.id} place={place}/></ul>)}
        </>
    )
}

// Types
type PropsT = {
    places: Array<PlaceT>
}