import { memo, useEffect, useState } from 'react'
import { Modal, Tree } from 'antd'
import { list, roleRights } from '@/api/rights'

export default memo(({ open, hidden, role, submit }) => {
  const [loading, setLoading] = useState(false)
  const [rightsList, setRightsList] = useState(null)
  const [currentRights, setCurrentRights] = useState(null)

  const submitAssigning = async () => {
    setLoading(true)
    await submit(role?.id, currentRights)
    setLoading(false)
    cancel()
  }

  const cancel = () => {
    setCurrentRights(null)
  }

  const onCheck = (keys, e) => {
    console.log(keys)
    setCurrentRights(keys)
  }

  const getRightOptions = async () => {
    let {
      data: { rights },
    } = await list('tree')
    // function handleChildren(arr) {
    //   if (!arr) return
    //   for (const item of arr) {
    //     if (item.level >= 2) {
    //       item.disableCheckbox = true
    //     }
    //     handleChildren(item.children)
    //   }
    // }
    // handleChildren(rights)
    setRightsList(rights)
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
  }, [role, open])

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
        selectable={false}
      />
    </Modal>
  )
})
