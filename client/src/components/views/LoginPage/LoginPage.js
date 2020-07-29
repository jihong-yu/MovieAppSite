import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { Typography, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

const { Title } = Typography

const LoginPage = (props) => {
  const dispatch = useDispatch()
  const rememberMechecked = localStorage.getItem('rememberMe') ? true : false

  const [rememberMe, setRemeberMe] = useState(rememberMechecked)
  const [formErrorMessage, setFormErrorMessage] = useState('')

  const handleRememberMe = () => {
    setRemeberMe(!rememberMe)
  }
  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : ''
  //localStrage는 브라우저가 닫혀도 저장이됨
  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(5, 'password must be at least 5 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          }

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId)
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.email)
                } else {
                  localStorage.removeItem('rememberMe')
                }
                props.history.push('/')
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch((err) => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage('')
              }, 3000)
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
            <Title level={2}>Log In</Title>
            <Form
              onSubmit={handleSubmit}
              style={{ width: '450px', height: '400px' }}
            >
              {/*일반 form은 태그 바로옆의 onSubmit={handleSubmit} 으로 버튼눌렀을때 동작 */}
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<UserOutlined />}
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
              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
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

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: '#ff0000bf',
                      fontSize: '0.7rem',
                      border: '1px solid',
                      padding: '1rem',
                      borderRadius: '10px',
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <Form.Item>
                <Checkbox
                  id="rememberMe"
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  Remember me
                </Checkbox>
                <a
                  className="login-from-forgot"
                  href="/reset_user"
                  style={{ float: 'right' }}
                >
                  forgot password
                </a>
                <div>
                  <Button
                    onClick={handleSubmit}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: '100%' }}
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>{' '}
                  {/*antd Form 은 버튼에있는 onClick으로 handleSubmit이 동작 */}
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default withRouter(LoginPage)
