import {UsersList} from "../components/UsersList";
import {usersDummyArray} from "../../bll/bll";

export const Users = () => {
    return (
        <UsersList users={usersDummyArray}/>
    )
}