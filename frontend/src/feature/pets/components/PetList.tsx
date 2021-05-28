import React from "react";
import {PetT} from "../redux/pet-reducer";
import {Card} from "../../../common/styles/layout/Card";
import {Button} from "../../../common/components/uiElements/Button";
import {PetItem} from "./PetItem";

export const PetList: React.FC<PropsT> = (props) => {

    const {
        pets,
    } = props

    if (pets.length === 0) {
        return (
            <div>
                <Card>
                    <h2>Add your pet ;)</h2>
                    <Button to="/pets/new">Add pet</Button>
                </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
            {pets.map(pet => <ul key={pet.id}><PetItem key={pet.id} pet={pet}/></ul>)}
        </React.Fragment>
    )
}

// Types
type PropsT = {
    pets: Array<PetT>
}