import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../_shared/components/form/StyledForm";
import {InputWrapper} from "../../_shared/components/form/InputWrapper";
import {Input} from "../../_shared/components/form/Input";
import styled from "styled-components/macro";
import {Card} from "../../_shared/components/layout/Card";
import {Button} from "../../_shared/components/uiElements/Button";

export const LoginForm = () => {

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
        onSubmit: async (values, formikHelpers: FormikHelpers<LoginFormValueT>) => {

            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>

                <InputWrapper>
                    <Input placeholder="Email"
                           type="text"
                           error={formik.errors.email}
                           {...formik.getFieldProps('email')}/>
                </InputWrapper>

                <InputWrapper>
                    <Input placeholder="Password"
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