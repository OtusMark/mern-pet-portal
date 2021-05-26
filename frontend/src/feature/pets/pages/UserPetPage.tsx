import React, {useEffect} from "react"
import {getPetsByUserId, PetT} from "../../../bll/reducers/pet-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {PetList} from "../components/PetList";
import {useParams} from "react-router-dom";
import {ParamsT} from "../../../App";

export const UserPetPage = () => {

    const userId = useParams<ParamsT>().userId

    const UserPets = useSelector<AppRootStateT, Array<PetT>>(state => state.pet)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPetsByUserId(userId))
    }, [])

    return (
        <PetList pets={UserPets}/>
    )
}