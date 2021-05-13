import React, {useEffect} from "react"
import {getPlacesByUserId, PlaceT} from "../../../bll/reducers/place-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {PlaceList} from "../components/PlaceList";
import {useParams} from "react-router-dom";
import {ParamsT} from "../../../App";

export const UserPlacesPage = () => {


    const userId = useParams<ParamsT>().userId

    const UserPlaces = useSelector<AppRootStateT, Array<PlaceT>>(state => state.place)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPlacesByUserId(userId))
    }, [])

    return (
        <PlaceList places={UserPlaces}/>
    )
}