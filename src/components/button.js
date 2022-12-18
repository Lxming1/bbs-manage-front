import { Button, Tooltip } from 'antd'
import { memo } from 'react'

export default memo(({ title, action, icon, danger, other }) => {
  return (
    <Tooltip placement="top" title={title}>
      <Button
        type={other ? '' : 'primary'}
        danger={danger}
        onClick={action}
        shape="round"
        icon={icon}
      />
    </Tooltip>
  )
})
