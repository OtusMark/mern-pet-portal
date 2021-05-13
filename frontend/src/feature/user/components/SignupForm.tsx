import {FormikHelpers, useFormik} from "formik";
import {StyledForm} from "../../_shared/components/form/StyledForm";
import {InputWrapper} from "../../_shared/components/form/InputWrapper";
import {Input} from "../../_shared/components/form/Input";
import styled from "styled-components/macro";
import {Card} from "../../_shared/components/layout/Card";
import {Button} from "../../_shared/components/uiElements/Button";
import {useDispatch} from "react-redux";
import {signup} from "../../../bll/reducers/auth-reducer";

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
            return errors
        },
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: (values, formikHelpers: FormikHelpers<SignupFormValueT>) => {

            dispatch(signup(values))
            formikHelpers.resetForm()
        }
    })

    return (
        <StyledCard>
            <StyledForm onSubmit={formik.handleSubmit}>
                <InputWrapper>
                    <Input placeholder="Name"
                           type="text"
                           error={formik.errors.name}
                           {...formik.getFieldProps('name')}/>
                </InputWrapper>

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
}

type SignupFormErrorT = {
    name?: string
    email?: string
    password?: string
}