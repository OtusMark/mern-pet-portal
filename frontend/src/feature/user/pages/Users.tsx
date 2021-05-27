import {UsersList} from "../components/UsersList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../app/redux/store";
import {getUsers, UserT} from "../redux/users-reducer";
import {useEffect} from "react";

export const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const users = useSelector<AppRootStateT, Array<UserT>>(state => state.users)

    return (
        <UsersList users={users}/>
    )
}