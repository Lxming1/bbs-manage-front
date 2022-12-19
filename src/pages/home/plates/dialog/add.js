import { memo, useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd'

export default memo(({ submit, open, hidden }) => {
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
  const [loading, setLoading] = useState(false)
  const onChange = (value) => setFields(value)

  const submitAdd = async () => {
    const [name, desc] = fields.map((item) => item.value)
    if (name.trim() !== '' && desc.trim() !== '') {
      setLoading(true)
      await submit(name, desc)
      setLoading(false)
      cancel()
    }
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

  return (
    <Modal
      title="添加板块"
      open={open}
      onOk={submitAdd}
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
        <Form.Item label="板块名称" name="name">
          <Input placeholder="请输入板块名称" />
        </Form.Item>
        <Form.Item label="板块描述" name="desc">
          <Input placeholder="请输入板块描述" />
        </Form.Item>
      </Form>
    </Modal>
  )
})
