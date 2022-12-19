import { memo, useEffect, useState } from 'react'
import { Modal, Tree } from 'antd'
import { list, roleRights } from '@/api/rights'

export default memo(({ open, hidden, role, submit }) => {
  const [loading, setLoading] = useState(false)
  const [rightsList, setRightsList] = useState(null)
  const [currentRights, setCurrentRights] = useState(null)
  console.log(currentRights)
  const submitAssigning = async () => {
    setLoading(true)
    await submit(role?.id, currentRights)
    setLoading(false)
    cancel()
  }

  const cancel = () => {
    setCurrentRights(null)
  }

  const onCheck = (keys) => {
    setCurrentRights(keys)
  }

  const getRightOptions = async () => {
    const { data: allRights } = await list('tree')
    setRightsList(allRights.rights)
  }

  const getCurrrntRights = async () => {
    if (!role?.id) return
    const { data: rightsList } = await roleRights(role?.id)
    setCurrentRights(rightsList)
  }

  useEffect(() => {
    getRightOptions()
  }, [])

  useEffect(() => {
    getCurrrntRights()
  }, [role])

  return (
    <Modal
      title="分配权限"
      open={open}
      onOk={submitAssigning}
      confirmLoading={loading}
      onCancel={() => {
        cancel()
        hidden()
      }}
      centered>
      <Tree
        checkable
        onCheck={onCheck}
        treeData={rightsList}
        defaultExpandAll
        checkedKeys={currentRights}
        height={500}
      />
    </Modal>
  )
})
