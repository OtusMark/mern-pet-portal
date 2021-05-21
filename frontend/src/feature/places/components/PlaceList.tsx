import React from "react";
import {PlaceT} from "../../../bll/reducers/place-reducer";
import {Card} from "../../../shared/components/layout/Card";
import {Button} from "../../../shared/components/uiElements/Button";
import {PlaceItem} from "./PlaceItem";

export const PlaceList: React.FC<PropsT> = (props) => {

    const {
        places,
    } = props

    if (places.length === 0) {
        return (
            <div>
                <Card>
                    <h2>No places found. Create new place</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
            {places.map(place => <ul key={place.id}><PlaceItem key={place.id} place={place}/></ul>)}
        </React.Fragment>
    )
}

// Types
type PropsT = {
    places: Array<PlaceT>
}