import {FormikHelpers, useFormik} from "formik";
import styled from "styled-components/macro";
import {Button} from "../../_shared/components/uiElements/Button";
import {InputText} from "../../_shared/components/uiElements/InputText";

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
            values.title = ''
            values.description = ''
            values.address = ''
        }
    })

    return (
        <StyledForm onSubmit={formik.handleSubmit}>

            <TextFieldWrapper>
                <InputText placeholder="Place title" {...formik.getFieldProps('title')} type="text"/>
                {formik.errors.title ? <FormError>{formik.errors.title}</FormError> : null}
            </TextFieldWrapper>

            <TextFieldWrapper>
                <InputText placeholder="Place description" {...formik.getFieldProps('description')} type="text"/>
                {formik.errors.title ? <FormError>{formik.errors.title}</FormError> : null}
            </TextFieldWrapper>

            <TextFieldWrapper>
                <InputText placeholder="Place address" {...formik.getFieldProps('address')} type="text"/>
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