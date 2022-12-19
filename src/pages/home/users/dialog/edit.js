import { memo, useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd'

export default memo(({ submit, open, hidden, user, isProfile }) => {
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState([
    {
      name: ['email'],
      value: '',
    },
    {
      name: ['name'],
      value: '',
    },
    {
      name: ['password'],
      value: '',
    },
  ])

  const onChange = (value) => setFields(value)

  const submitEdit = async () => {
    const [_, name, password] = fields.map((item) => item.value)
    setLoading(true)
    if (!name) return
    if (isProfile) {
      if (!password) return
      await submit(user.id, name, password)
    } else {
      await submit(user.id, name)
    }
    setLoading(false)
    cancel()
  }

  const cancel = () => {
    setFields([
      {
        name: ['email'],
        value: '',
      },
      {
        name: ['name'],
        value: '',
      },
      {
        name: ['password'],
        value: '',
      },
    ])
  }

  useEffect(() => {
    setFields([
      {
        name: ['email'],
        value: user?.email,
      },
      {
        name: ['name'],
        value: user?.name,
      },
      {
        name: ['password'],
        value: '',
      },
    ])
  }, [user, open])

  return (
    <Modal
      title="编辑用户"
      open={open}
      onOk={submitEdit}
      confirmLoading={loading}
      onCancel={() => {
        cancel()
        hidden()
      }}
      centered>
      <Form
        name="form"
        autoComplete="off"
        fields={fields}
        onFieldsChange={(_, allFields) => onChange(allFields)}>
        <Form.Item label="邮箱" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="昵称" name="name">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        {isProfile && (
          <Form.Item label="密码" name="password">
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
})
