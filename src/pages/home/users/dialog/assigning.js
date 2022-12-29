import { memo, useEffect, useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { list } from '@/api/roles'
import { xmMessage } from '../../../../utils'

export default memo(({ isLoading, submit, open, hidden, user }) => {
  const [loading, setLoading] = useState(false)
  const [roleList, setRoleList] = useState(null)
  const [fields, setFields] = useState([
    {
      name: ['currentUser'],
      value: '',
    },
    {
      name: ['role'],
      value: '',
    },
    {
      name: ['assign'],
      value: '',
    },
  ])

  const onChange = (value) => setFields(value)

  const submitAssigning = async () => {
    const role = fields.map((item) => item.value)[2]
    if (!role) return
    setLoading(true)
    await submit(user?.id, role)
    setLoading(false)
    cancel()
  }

  const cancel = () => {
    setFields([
      {
        name: ['currentUser'],
        value: '',
      },
      {
        name: ['role'],
        value: '',
      },
      {
        name: ['assign'],
        value: null,
      },
    ])
  }

  useEffect(() => {
    setFields([
      {
        name: ['currentUser'],
        value: user?.name,
      },
      {
        name: ['role'],
        value: user?.role?.name,
      },
      {
        name: ['assign'],
        value: null,
      },
    ])
  }, [user, open])

  useEffect(() => {
    if (open === true) {
      list(1, 999).then(({ data: res }) => {
        setRoleList(res.roles)
      })
    }
  }, [open])

  return (
    <Modal
      title="分配角色"
      open={open}
      onOk={submitAssigning}
      confirmLoading={loading}
      onCancel={hidden}
      centered>
      <Form
        name="form"
        autoComplete="off"
        fields={fields}
        onFieldsChange={(_, allFields) => onChange(allFields)}>
        <Form.Item label="当前用户" name="currentUser">
          <Input disabled />
        </Form.Item>
        <Form.Item label="当前角色" name="role">
          <Input disabled />
        </Form.Item>
        <Form.Item label="分配新角色" name="assign">
          <Select
            placeholder="请选择新角色"
            options={roleList?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
