import { memo } from 'react'
import { Modal } from 'antd'

export default memo(({ isLoading, submit, open, hidden }) => {
  return (
    <Modal
      title="删除角色"
      open={open}
      onOk={submit}
      confirmLoading={isLoading}
      onCancel={hidden}
      centered>
      <div style={{ fontSize: '16px', textAlign: 'center' }}>确认删除该角色吗？</div>
    </Modal>
  )
})
