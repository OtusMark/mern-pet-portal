import React, {useState} from "react";
import {deletePlace, PlaceT} from "../../../bll/reducers/place-reducer";
import {Button} from "../../../shared/components/uiElements/Button";
import {Map} from "../../../shared/components/uiElements/Map";
import {Card} from "../../../shared/components/layout/Card";
import {Avatar} from "../../../shared/components/uiElements/Avatar";
import {Modal} from "../../../shared/components/uiElements/Modal";
import {useDispatch, useSelector} from "react-redux";
import {UpdatePlaceForm} from "./UpdatePlaceForm";
import {AppRootStateT} from "../../../bll/store";

export const PlaceItem: React.FC<PropsT> = (props) => {

    const {
        place
    } = props

    const dispatch = useDispatch()

    const token = useSelector<AppRootStateT, string>(state => state.auth.token as string)

    const [showMap, setShowMap] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const toggleMapHandler = () => setShowMap(!showMap)

    const toggleEditHandler = () => setShowEdit(!showEdit)

    const deletePlaceHandler = () => {
        dispatch(deletePlace({placeId: place.id, token}))
    }

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
                        <Button onClick={toggleEditHandler}>Edit</Button>
                        <Button onClick={deletePlaceHandler}>Delete</Button>
                    </div>
                </Card>
            </li>

            <Modal show={showMap} toggleModal={toggleMapHandler}>
                <Map show={showMap} center={place.coordinates} zoom={16}/>
            </Modal>

            <Modal show={showEdit} toggleModal={toggleEditHandler}>
                <UpdatePlaceForm toggleModal={toggleEditHandler} placeId={place.id} userId={place.creatorId} token={token}/>
            </Modal>
        </>
    )
}

// Types
type PropsT = {
    place: PlaceT
}