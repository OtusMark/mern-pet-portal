import {FormikHelpers, useFormik} from "formik";
import styled from "styled-components/macro";
import {Button} from "../../_shared/components/uiElements/Button";
import {Input} from "../../_shared/components/form/Input";
import {Card} from "../../_shared/components/layout/Card";
import {InputWrapper} from "../../_shared/components/form/InputWrapper";
import {StyledForm} from "../../_shared/components/form/StyledForm";
import {addPlace} from "../../../bll/reducers/place-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";

export const AddPlacePage = () => {

    const creatorId = useSelector<AppRootStateT, string>(state => state.auth.loggedInUserId as string)
    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: AddPlaceFormErrorT = {}
            if (!values.title) {
                errors.title = 'Title is required'
            }
            if (!values.address) {
                errors.address = 'Address is required'
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
            address: '',
            description: '',
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<AddPlaceFormValueT>) => {

            const dispatchValues = {
                ...values,
                creatorId
            }

            dispatch(addPlace(dispatchValues))
            formikHelpers.resetForm()
        }
    })

    return (
        <AddPlacePageMain>
            <StyledCard>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <InputWrapper>
                        <Input placeholder="Place title"
                               type="text"
                               error={formik.errors.title}
                               {...formik.getFieldProps('title')}/>
                    </InputWrapper>

                    <InputWrapper>
                        <Input placeholder="Place address"
                               type="text"
                               error={formik.errors.address}
                               {...formik.getFieldProps('address')}/>
                    </InputWrapper>

                    <InputWrapper>
                        <Input isTextarea
                               placeholder="Place description"
                               type="text"
                               rows={6}
                               error={formik.errors.description}
                               {...formik.getFieldProps('description')}/>
                    </InputWrapper>

                    <Button type='submit'>Add place</Button>
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
type AddPlaceFormValueT = {
    title: string
    description: string
    address: string
}

type AddPlaceFormErrorT = {
    title?: string
    description?: string
    address?: string
}