import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../../shared/components/form/StyledForm";
import {InputWrapper} from "../../../shared/components/form/InputWrapper";
import {Input} from "../../../shared/components/form/Input";
import styled from "styled-components/macro";
import {Card} from "../../../shared/components/layout/Card";
import {Button} from "../../../shared/components/uiElements/Button";
import {useDispatch} from "react-redux";
import {getPetsByUserId, updatePet} from "../../../bll/reducers/pet-reducer";
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
        onSubmit: async (values, formikHelpers: FormikHelpers<UpdatePetFormT>) => {

            const dispatchValues = {
                ...values,
                petId,
                token
            }

            await dispatch(updatePet(dispatchValues))
            await dispatch(getPetsByUserId(userId))
            await toggleModal()
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <InputWrapper>
                    <Input placeholder="New name"
                           type="text"
                           error={formik.errors.name}
                           {...formik.getFieldProps('name')}/>
                </InputWrapper>

                <InputWrapper>
                    <Input placeholder="New description"
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