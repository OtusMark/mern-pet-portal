import {FormikHelpers, useFormik} from 'formik'
import styled from 'styled-components/macro'
import {Button} from '../../../common/components/uiElements/Button'
import {Input} from '../../../common/components/form/Input'
import {Card} from '../../../common/components/layout/Card'
import {InputWrapper} from '../../../common/styles/form/InputWrapper'
import {StyledForm} from '../../../common/styles/form/StyledForm'
import {addPet} from '../redux/pet-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateT} from '../../../app/redux/store'
import {Textarea} from '../../../common/components/form/Textarea'
import {ImageUpload} from '../../../common/components/form/ImageUpload'
import React, {ChangeEvent, useRef} from 'react'
import {ImagePreview} from '../../../common/components/form/ImagePreview'

export const AddPetPage = () => {

    const creatorId = useSelector<AppRootStateT, string>(state => state.auth.loggedInUserId as string)
    const token = useSelector<AppRootStateT, string>(state => state.auth.token as string)
    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: AddPetFormErrorT = {}
            const AllowedImageTypes = ['image/gif', 'image/jpeg', 'image/png']
            if (!values.name) {
                errors.name = 'Name is required'
            }
            if (!values.description) {
                errors.description = 'Description is required'
            } else if (values.description.length < 5) {
                errors.description = 'Description length must be higher than 4'
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
            description: '',
            image: undefined
        },
        onSubmit: (values: AddPetFormValueT, formikHelpers: FormikHelpers<any>) => {
            // !I! resolve any
            const dispatchValues = {
                ...values,
                creatorId,
                token
            }
            console.log(values)

            dispatch(addPet(dispatchValues))
            formikHelpers.resetForm()
        }
    })

    return (
        <AddPlacePageMain>
            <StyledCard>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <ImagePreview imageFile={formik.values.image}/>
                    <InputWrapper>
                        <ImageUpload id='image'
                                     name='image'
                                     text='Add pet image'
                                     accept='.jpg,.png,.jpeg'
                                     error={formik.errors.image}
                                     formImage={formik.values.image}
                                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                         // @ts-ignore !I! Find a solution to object is possibly null
                                         formik.setFieldValue('image', event.currentTarget.files[0])
                                     }}/>
                    </InputWrapper>

                    <InputWrapper>
                        <Input placeholder='Pet name'
                               type='text'
                               error={formik.errors.name}
                               {...formik.getFieldProps('name')}/>
                    </InputWrapper>

                    <InputWrapper>
                        <Textarea placeholder='Pet description'
                                  rows={4}
                                  error={formik.errors.description}
                                  {...formik.getFieldProps('description')}/>
                    </InputWrapper>

                    <Button type='submit'>Add pet</Button>
                </StyledForm>
            </StyledCard>
        </AddPlacePageMain>
    )
}

// Styles
const AddPlacePageMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`

const StyledCard = styled(Card)`
  width: 30rem;
`

// Types
export type AddPetFormValueT = {
    name: string
    description: string
    image: File | undefined
}

export type AddPetFormSubmitT = {
    name: string
    description: string
    image: File | undefined
    creatorId: string
    token: string
}

type AddPetFormErrorT = {
    name?: string
    description?: string
    image?: string
}