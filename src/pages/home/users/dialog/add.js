import { memo, useState } from 'react'
import { Modal, Form, Input } from 'antd'

export default memo(({ submit, open, hidden }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const submitAdd = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      setLoading(true)
      await submit(email, password)
      setLoading(false)
      setEmail('')
      setPassword('')
    }
  }
  return (
    <Modal
      title="添加用户"
      open={open}
      onOk={submitAdd}
      confirmLoading={loading}
      onCancel={hidden}
      centered>
      <Form name="form" autoComplete="off">
        <Form.Item label="邮箱" name="email">
          <Input
            placeholder="请输入邮箱"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password
            placeholder="请输入密码"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
