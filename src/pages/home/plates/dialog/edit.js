import { memo, useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd'

export default memo(({ submit, open, hidden, plate }) => {
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: '',
    },
    {
      name: ['description'],
      value: '',
    },
  ])

  const onChange = (value) => setFields(value)

  const submitEdit = async () => {
    const [name, description] = fields.map((item) => item.value)
    setLoading(true)
    await submit(plate.id, name, description)
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
        name: ['description'],
        value: '',
      },
    ])
  }

  useEffect(() => {
    setFields([
      {
        name: ['name'],
        value: plate?.name,
      },
      {
        name: ['description'],
        value: plate?.description,
      },
    ])
  }, [plate, open])

  return (
    <Modal
      title="编辑板块"
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
        <Form.Item label="板块名称" name="name">
          <Input placeholder="请输入板块名称" />
        </Form.Item>
        <Form.Item label="板块描述" name="description">
          <Input placeholder="请输入板块描述" />
        </Form.Item>
      </Form>
    </Modal>
  )
})
