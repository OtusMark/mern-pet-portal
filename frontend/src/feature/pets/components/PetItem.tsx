import React, {useState} from 'react'
import {deletePet, PetT} from '../../../bll/reducers/pet-reducer'
import {Button} from '../../../shared/components/uiElements/Button'
import {Card} from '../../../shared/components/layout/Card'
import {Avatar} from '../../../shared/components/uiElements/Avatar'
import {Modal} from '../../../shared/components/uiElements/Modal'
import {useDispatch, useSelector} from 'react-redux'
import {UpdatePetForm} from './UpdatePetForm'
import {AppRootStateT} from '../../../bll/store'

export const PetItem: React.FC<PropsT> = (props) => {

    const {
        pet
    } = props

    const dispatch = useDispatch()

    const token = useSelector<AppRootStateT, string>(state => state.auth.token as string)

    const [showEdit, setShowEdit] = useState(false)

    const toggleEditHandler = () => setShowEdit(!showEdit)

    const deletePlaceHandler = () => {
        dispatch(deletePet({petId: pet.id, token}))
    }

    return (
        <>
            <li>
                <Card>
                    <h2>{pet.name}</h2>
                    <p>{pet.description}</p>
                    <Avatar src={pet.image} alt=''/>
                    <div>
                        <Button onClick={toggleEditHandler}>Edit</Button>
                        <Button onClick={deletePlaceHandler}>Delete</Button>
                    </div>
                </Card>
            </li>

            <Modal show={showEdit} toggleModal={toggleEditHandler}>
                <UpdatePetForm toggleModal={toggleEditHandler} petId={pet.id} userId={pet.creatorId} token={token}/>
            </Modal>
        </>
    )
}

// Types
type PropsT = {
    pet: PetT
}