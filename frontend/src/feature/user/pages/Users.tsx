import {UsersList} from "../components/UsersList";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {UserT} from "../../../bll/reducers/user-reducer";

export const Users = () => {

    const users = useSelector<AppRootStateT, Array<UserT>>(state => state.user)

    return (
        <UsersList users={users}/>
    )
}