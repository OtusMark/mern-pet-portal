import React, {useState} from "react";
import {PlaceT} from "../../../bll/reducers/place-reducer";
import {Button} from "../../_shared/components/uiElements/Button";
import {Map} from "../../_shared/components/uiElements/Map";
import {Card} from "../../_shared/components/layout/Card";
import {Avatar} from "../../_shared/components/uiElements/Avatar";
import {Modal} from "../../_shared/components/uiElements/Modal";

export const PlaceItem: React.FC<PropsT> = (props) => {

    const {
        place
    } = props

    const [showMap, setShowMap] = useState(false)

    const toggleMapHandler = () => setShowMap(!showMap)

    return (
        <>
            <li>
                <Card>
                    <div>{place.id}</div>
                    <h2>{place.title}</h2>
                    <h3>{place.address}</h3>
                    <p>{place.description}</p>
                    <Avatar src={place.image} alt=""/>
                    <div>{place.creatorId}</div>
                    <div>{place.coordinates.lat}</div>
                    <div>{place.coordinates.lng}</div>
                    <div>
                        <Button onClick={toggleMapHandler}>View on map</Button>
                        <Button to={`/places/${place.id}`}>Edit</Button>
                        <Button>Delete</Button>
                    </div>
                </Card>
            </li>

            <Modal show={showMap} toggleModal={toggleMapHandler}>
                <Map show={showMap} center={place.coordinates} zoom={16}/>
            </Modal>
        </>
    )
}

// Types
type PropsT = {
    place: PlaceT
}