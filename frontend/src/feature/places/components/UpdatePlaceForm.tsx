import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../_shared/components/form/StyledForm";
import {InputWrapper} from "../../_shared/components/form/InputWrapper";
import {Input} from "../../_shared/components/form/Input";
import styled from "styled-components/macro";
import {Card} from "../../_shared/components/layout/Card";
import {Button} from "../../_shared/components/uiElements/Button";
import {useDispatch} from "react-redux";
import {getPlacesByUserId, updatePlace} from "../../../bll/reducers/place-reducer";
import React from "react";

export const UpdatePlaceForm: React.FC<PropsT> = (props) => {

    const {
        placeId,
        toggleModal,
        userId,
        token
    } = props

    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: UpdatePlaceFormErrorT = {}
            if (!values.title) {
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
            title: '',
            description: '',
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<UpdatePlaceFormT>) => {

            const dispatchValues = {
                ...values,
                placeId,
                token
            }

            await dispatch(updatePlace(dispatchValues))
            await dispatch(getPlacesByUserId(userId))
            await toggleModal()
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <InputWrapper>
                    <Input placeholder="New title"
                           type="text"
                           error={formik.errors.title}
                           {...formik.getFieldProps('title')}/>
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
    placeId: string
    toggleModal: () => void
    userId: string
    token: string
}

type UpdatePlaceFormT = {
    title: string
    description: string
}

type UpdatePlaceFormErrorT = {
    title?: string
    description?: string
}