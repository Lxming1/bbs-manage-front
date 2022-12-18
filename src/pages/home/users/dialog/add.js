import { memo } from 'react'
import { Modal } from 'antd'

export default memo(({ isLoading, submit, open, hidden }) => {
  return (
    <Modal
      title="添加用户"
      open={open}
      onOk={submit}
      confirmLoading={isLoading}
      onCancel={hidden}
      centered></Modal>
  )
})
