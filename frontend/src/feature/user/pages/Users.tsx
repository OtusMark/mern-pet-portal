import {UsersList} from "../components/UsersList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {getUsers, UserT} from "../../../bll/reducers/user-reducer";
import {useEffect} from "react";

export const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const users = useSelector<AppRootStateT, Array<UserT>>(state => state.user)

    return (
        <UsersList users={users}/>
    )
}