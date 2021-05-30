import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../../common/styles/form/StyledForm";
import {InputWrapper} from "../../../common/styles/form/InputWrapper";
import {InputText} from "../../../common/components/form/InputText";
import styled from "styled-components/macro";
import {Card} from "../../../common/styles/layout/Card";
import {Button} from "../../../common/components/uiElements/Button";
import {useDispatch} from "react-redux";
import {login} from "../redux/auth-reducer";

export const LoginForm = () => {

    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: LoginFormErrorT = {}
            if (!values.email) {
                errors.email = 'Email is required'
            }
            if (!values.password) {
                errors.password = 'Password is required'
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginFormValueT>) => {

            dispatch(login(values))
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <InputWrapper>
                    <InputText placeholder="Email"
                               type="text"
                               error={formik.errors.email}
                               {...formik.getFieldProps('email')}/>
                </InputWrapper>

                <InputWrapper>
                    <InputText placeholder="Password"
                               type="text"
                               error={formik.errors.password}
                               {...formik.getFieldProps('password')}/>
                </InputWrapper>

                <Button type='submit'>Login</Button>
            </StyledForm>
        </StyledCard>
    )
}

// Styles
const StyledCard = styled(Card)`
  width: 30rem;
`

// Types
type LoginFormValueT = {
    email: string
    password: string
}

type LoginFormErrorT = {
    email?: string
    password?: string
}