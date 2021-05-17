import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../_shared/components/form/StyledForm";
import {InputWrapper} from "../../_shared/components/form/InputWrapper";
import {Input} from "../../_shared/components/form/Input";
import styled from "styled-components/macro";
import {Card} from "../../_shared/components/layout/Card";
import {Button} from "../../_shared/components/uiElements/Button";
import {useDispatch} from "react-redux";
import {signup} from "../../../bll/reducers/auth-reducer";
import {ImageUpload} from "../../_shared/components/form/ImageUpload";
import React from "react";
import {ImagePreview} from "../../_shared/components/form/ImagePreview";

export const SignupForm = () => {

    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: SignupFormErrorT = {}
            if (!values.name) {
                errors.name = 'Name is required'
            }
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 6) {
                errors.password = 'Password must be higher then 5'
            }
            if (!values.image) {
                errors.image = 'Image is required'
            }
            // !I! Add validation of image format!
            return errors
        },
        initialValues: {
            name: '',
            email: '',
            password: '',
            image: ''
        },
        onSubmit: (values, formikHelpers: FormikHelpers<SignupFormValueT>) => {

            console.log(values)

            // dispatch(signup(values))
            // formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <ImagePreview imageFile={formik.values.image}/>
                <InputWrapper>
                    <ImageUpload id='image'
                                 name='image'
                                 accept='.jpg,.png,.jpeg'
                                 error={formik.errors.image}
                                 onChange={(event: any) => {
                                     formik.setFieldValue('image', event.currentTarget.files[0]);
                                 }}/>
                </InputWrapper>

                <InputWrapper>
                    <Input placeholder='Name'
                           type='text'
                           error={formik.errors.name}
                           {...formik.getFieldProps('name')}/>
                </InputWrapper>

                <InputWrapper>
                    <Input placeholder='Email'
                           type='text'
                           error={formik.errors.email}
                           {...formik.getFieldProps('email')}/>
                </InputWrapper>

                <InputWrapper>
                    <Input placeholder='Password'
                           type='text'
                           error={formik.errors.password}
                           {...formik.getFieldProps('password')}/>
                </InputWrapper>

                <Button type='submit'>Sign up</Button>
            </StyledForm>
        </StyledCard>
    )
}

// Styles
const StyledCard = styled(Card)`
  width: 30rem;
`

// Types
type SignupFormValueT = {
    name: string
    email: string
    password: string
    image: any // !I! Replace any
}

type SignupFormErrorT = {
    name?: string
    email?: string
    password?: string
    image?: any // !I! Replace any
}