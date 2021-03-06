import {FormikHelpers, useFormik} from 'formik'
import {StyledForm} from '../../../common/styles/form/StyledForm'
import {InputWrapper} from '../../../common/styles/form/InputWrapper'
import {InputText} from '../../../common/components/form/InputText'
import styled from 'styled-components/macro'
import {Card} from '../../../common/styles/layout/Card'
import {Button} from '../../../common/components/uiElements/Button'
import {useDispatch} from 'react-redux'
import {ImageUpload} from '../../../common/components/form/ImageUpload'
import React from 'react'
import {ImagePreview} from '../../../common/components/form/ImagePreview'
import {signup} from '../redux/auth-reducer'

export const SignupForm = () => {

    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: SignupFormErrorT = {}
            const AllowedImageTypes = ['image/gif', 'image/jpeg', 'image/png']
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
                errors.image = 'Avatar is required'
            } else { // @ts-ignore !I! Check for undefined is not working...
                if (!AllowedImageTypes.includes(values.image.type)) {
                    errors.image = 'Image must be in JPG, PNG or GIF format'
                }
            }
            return errors
        },
        initialValues: {
            name: '',
            email: '',
            password: '',
            image: undefined
        },
        onSubmit: (values: SignupFormSubmitT, formikHelpers: FormikHelpers<any>) => {
            // !I! resolve any
            dispatch(signup(values))
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <ImagePreview imageFile={formik.values.image} width='200px'/>
                <InputWrapper>
                    <ImageUpload id='image'
                                 name='image'
                                 text='Choose your avatar'
                                 accept='.jpg,.png,.jpeg'
                                 error={formik.errors.image}
                                 formImage={formik.values.image}
                                 onChange={(event: any) => {
                                     formik.setFieldValue('image', event.currentTarget.files[0])
                                 }}/>
                </InputWrapper>

                <InputWrapper>
                    <InputText placeholder='Name'
                               type='text'
                               error={formik.errors.name}
                               {...formik.getFieldProps('name')}/>
                </InputWrapper>

                <InputWrapper>
                    <InputText placeholder='Email'
                               type='text'
                               error={formik.errors.email}
                               {...formik.getFieldProps('email')}/>
                </InputWrapper>

                <InputWrapper>
                    <InputText placeholder='Password'
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
export type SignupFormSubmitT = {
    name: string,
    email: string,
    password: string
    image: File | undefined
}

type SignupFormErrorT = {
    name?: string
    email?: string
    password?: string
    image?: string
}