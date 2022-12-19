import { memo, useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd'

export default memo(({ submit, open, hidden, role }) => {
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: '',
    },
    {
      name: ['desc'],
      value: '',
    },
  ])

  const onChange = (value) => setFields(value)

  const submitEdit = async () => {
    const [name, desc] = fields.map((item) => item.value)
    setLoading(true)
    await submit(role.id, name, desc)
    setLoading(false)
    cancel()
  }

  const cancel = () => {
    setFields([
      {
        name: ['name'],
        value: '',
      },
      {
        name: ['desc'],
        value: '',
      },
    ])
  }

  useEffect(() => {
    setFields([
      {
        name: ['name'],
        value: role?.name,
      },
      {
        name: ['desc'],
        value: role?.desc,
      },
    ])
  }, [role, open])

  return (
    <Modal
      title="编辑角色"
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
        <Form.Item label="角色名称" name="name">
          <Input placeholder="请输入角色名称" disabled={[1, 2, 3].includes(role?.id)} />
        </Form.Item>
        <Form.Item label="角色描述" name="desc">
          <Input placeholder="请输入角色描述" />
        </Form.Item>
      </Form>
    </Modal>
  )
})
