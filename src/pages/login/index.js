import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'
import LoginWrapper from './style'
import { login as loginApi } from '../../api/auth'
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { xmMessage } from '../../utils'

const Login = memo(() => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSending, setIsSending] = useState(false)

  const [emailTip, setEmailTip] = useState(null)
  const [passwordTip, setPasswordTip] = useState(null)

  const emailRef = useRef(null)
  const passRef = useRef(null)
  const btnRef = useRef(null)

  const login = throttle(async () => {
    try {
      const { email, password } = await form.validateFields()
      if (!email) return isNotInput(setEmailTip, '请输入邮箱！', emailRef)
      if (!password) return isNotInput(setPasswordTip, '请输入密码！', passRef)
      if (passwordTip) return
      setIsSending(true)
      try {
        const res = await loginApi({ email, password })
        if (res.code === 0) {
          xmMessage(0, '登录成功')
          const jsonMes = JSON.stringify(res.data)
          sessionStorage.setItem('user', jsonMes)
          navigate('/')
        }
      } catch (e) {
        throw new Error(e)
      }
    } catch (e) {
      setIsSending(false)
      console.log(e)
    }
  }, 1000)

  useEffect(() => {
    form.validateFields(['email'])
    form.validateFields(['password'])
  }, [email, form, password])

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
    setPasswordTip(null)
  }

  const isNotInput = (setTipFn, tips, ref) => {
    setTipFn(tips)
    ref.current.focus()
  }

  useEffect(() => {
    const enterFn = throttle(async (e) => {
      if (e.key === 'Enter') await btnRef.current.click()
    })
    window.addEventListener('keydown', enterFn)
    return () => window.removeEventListener('keydown', enterFn)
  }, [])

  return (
    <LoginWrapper>
      <div className="box">
        <h2>账号登录</h2>
        <Form form={form}>
          <Form.Item help={emailTip} validateStatus={emailTip !== null && 'error'} name="email">
            <Input
              placeholder="邮箱账号"
              value={email}
              onChange={emailChange}
              ref={emailRef}
              prefix={<UserOutlined style={{ color: '#ccc' }} />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            help={passwordTip}
            validateStatus={passwordTip !== null && 'error'}>
            <Input.Password
              type="password"
              placeholder="输入密码"
              value={password}
              onChange={passwordChange}
              ref={passRef}
              prefix={<LockOutlined style={{ color: '#ccc' }} />}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={login} className="loginBtn" ref={btnRef} size="large">
              {isSending ? <LoadingOutlined /> : '登 录'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
})

export default Login
