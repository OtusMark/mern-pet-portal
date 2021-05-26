import React from "react";
import {PetT} from "../../../bll/reducers/pet-reducer";
import {Card} from "../../../shared/components/layout/Card";
import {Button} from "../../../shared/components/uiElements/Button";
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