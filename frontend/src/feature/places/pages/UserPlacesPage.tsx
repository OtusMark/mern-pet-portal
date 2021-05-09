import React from "react"
import {PlaceT} from "../../../bll/reducers/place-reducer";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {PlaceList} from "../components/PlaceList";
import {useParams} from "react-router-dom";
import {ParamsT} from "../../../App";

export const UserPlacesPage = () => {

    const places = useSelector<AppRootStateT, Array<PlaceT>>(state => state.place)

    const userId = useParams<ParamsT>().userId

    const UserPlaces = places.filter(place => place.creatorId === userId)

    return (
        <PlaceList places={UserPlaces}/>
    )
}