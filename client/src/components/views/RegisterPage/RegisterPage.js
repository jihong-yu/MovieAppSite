import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup'
import { registerUser } from '../../../_actions/user_action'
import { Form, Input, Button } from 'antd'

const RegisterPage = (props) => {
  const dispatch = useDispatch()
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }
  return (
    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required('Name is required'),
        lastName: yup.string().required('Last Name is required'),
        email: yup
          .string()
          .email('Email is invalid')
          .required('Email is required'),
        password: yup
          .string()
          .min(5, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'passwords must match')
          .required('Confirm Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
          }
          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push('/login')
            } else {
              alert(response.payload.err.errmsg)
            }
          })
          setSubmitting(false)
        }, 500)
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props
        return (
          <div className="app">
            <h2>Sign up</h2>
            <Form
              style={{ minWidth: '575px', height: '400px' }}
              {...layout}
              onsubmit={handleSubmit}
            >
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? 'error' : 'success'
                }
              >
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
              >
                <Input
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Password Confirm"
                hasFeedback
                validateStatus={
                  errors.confirmPassword && touched.confirmPassword
                    ? 'error'
                    : 'success'
                }
              >
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  style={{ width: '30%' }}
                  onClick={handleSubmit}
                  htmlType="submit"
                  type="primary"
                  disabled={isSubmitting}
                >
                  submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default RegisterPage
