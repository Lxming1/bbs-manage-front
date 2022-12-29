import { Button, Tooltip } from 'antd'
import { memo } from 'react'

export default memo(({ title, action, icon, danger, other, disabled }) => {
  return (
    <Tooltip placement="top" title={title}>
      <Button
        type={other ? '' : 'primary'}
        style={{ width: '45px' }}
        danger={danger}
        onClick={action}
        icon={icon}
        disabled={disabled}
      />
    </Tooltip>
  )
})
