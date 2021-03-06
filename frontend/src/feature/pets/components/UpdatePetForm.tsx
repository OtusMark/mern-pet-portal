import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../../common/styles/form/StyledForm";
import {InputWrapper} from "../../../common/styles/form/InputWrapper";
import {InputText} from "../../../common/components/form/InputText";
import styled from "styled-components/macro";
import {Card} from "../../../common/styles/layout/Card";
import {Button} from "../../../common/components/uiElements/Button";
import {batch, useDispatch} from 'react-redux'
import {getPetsByUserId, updatePet} from "../redux/pet-reducer";
import React from "react";

export const UpdatePetForm: React.FC<PropsT> = (props) => {

    const {
        petId,
        toggleModal,
        userId,
        token
    } = props

    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: UpdatePetFormErrorT = {}
            if (!values.name) {
                errors.title = 'Title is required'
            }
            if (!values.description) {
                errors.description = 'Description is required'
            } else if (values.description.length < 5) {
                errors.description = 'Description length must be higher than 4'
            }
            return errors
        },
        initialValues: {
            name: '',
            description: '',
        },
        onSubmit: (values, formikHelpers: FormikHelpers<UpdatePetFormT>) => {

            const dispatchValues = {
                ...values,
                petId,
                token
            }

            batch(() => {
                dispatch(updatePet(dispatchValues))
                dispatch(getPetsByUserId(userId))
            })
            toggleModal()
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <InputWrapper>
                    <InputText placeholder="New name"
                               type="text"
                               error={formik.errors.name}
                               {...formik.getFieldProps('name')}/>
                </InputWrapper>

                <InputWrapper>
                    <InputText placeholder="New description"
                               type="text"
                               error={formik.errors.description}
                               {...formik.getFieldProps('description')}/>
                </InputWrapper>

                <Button type='submit'>Edit</Button>
            </StyledForm>
        </StyledCard>
    )
}

// Styles
const StyledCard = styled(Card)`
  width: 30rem;
`

// Types
type PropsT = {
    petId: string
    toggleModal: () => void
    userId: string
    token: string
}

type UpdatePetFormT = {
    name: string
    description: string
}

type UpdatePetFormErrorT = {
    title?: string
    description?: string
}