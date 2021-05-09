import {FormikHelpers, useFormik} from "formik";
import styled from "styled-components/macro";
import {Button} from "../../_shared/components/uiElements/Button";
import {Input} from "../../_shared/components/uiElements/Input";

export const NewPlace = () => {
    // const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {

        },
        initialValues: {
            title: '',
            description: '',
            address: '',
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValueT>) => {
            console.log(values)
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledForm onSubmit={formik.handleSubmit}>

            <TextFieldWrapper>
                <Input placeholder="Place title" {...formik.getFieldProps('title')} type="text"/>
                {formik.errors.title ? <FormError>{formik.errors.title}</FormError> : null}
            </TextFieldWrapper>

            <TextFieldWrapper>
                <Input isTextarea placeholder="Place description" {...formik.getFieldProps('description')} type="text"/>
                {formik.errors.title ? <FormError>{formik.errors.title}</FormError> : null}
            </TextFieldWrapper>

            <TextFieldWrapper>
                <Input placeholder="Place address" {...formik.getFieldProps('address')} type="text"/>
                {formik.errors.title ? <FormError>{formik.errors.title}</FormError> : null}
            </TextFieldWrapper>

            <Button type='submit'>Add place</Button>
        </StyledForm>
    )


}

// Styles
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-basis: 400px;
`

const TextFieldWrapper = styled.div`
  position: relative;

  margin-bottom: 1rem;
`

const FormError = styled.div`
  position: absolute;
  bottom: -23px;
  color: ${({theme}) => theme.palette.error.main};
`

// Types

type FormikValueT = {
    title: string
    description: string
    address: string
}