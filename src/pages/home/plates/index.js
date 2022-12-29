import React, { memo, useEffect, useState } from 'react'
import { list, edit, add, del } from '@/api/plate'
import Content from '../../../components/content'
import { Space, Button as AntdBtn } from 'antd'
import AddDialog from './dialog/add'
import EditDialog from './dialog/edit'
import DelDialog from './dialog/del'
import dayjs from 'dayjs'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import Button from '../../../components/button'
import { xmMessage } from '../../../utils'
import { useRights } from '../../../hooks'

const rightsObj = [
  {
    label: '添加板块',
    rights: 22,
  },
  {
    label: '删除板块',
    rights: 21,
  },
  {
    label: '编辑板块',
    rights: 23,
  },
]

const Roles = memo(() => {
  const rightsArr = useRights(rightsObj)
  const [roleList, setRoleList] = useState(null)
  const [addDialogShow, setAddDialogShow] = useState(false)
  const [editDialogShow, setEditDialogShow] = useState(false)
  const [delDialogShow, setDelDialogShow] = useState(false)
  const [currentPlate, setCurrentPlate] = useState(null)
  const [pagenum, setPagenum] = useState(1)
  const [pagesize, setPagesize] = useState(10)

  const headerContent = (
    <AntdBtn
      type="primary"
      onClick={() => setAddDialogShow(true)}
      shape="round"
      style={{ marginBottom: '10px' }}
      disabled={rightsArr[0]}>
      添加板块
    </AntdBtn>
  )

  const addSubmit = async (name, description) => {
    const result = await add({ name, description })
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setAddDialogShow(false)
  }
  const editSubmit = async (pid, name, description) => {
    const result = await edit(pid, { name, description })
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setEditDialogShow(false)
  }

  const delSubmit = async () => {
    const result = await del(currentPlate.id)
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setDelDialogShow(false)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '板块名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '板块描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      key: 'create_at',
      dataIndex: 'create_at',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            action={() => {
              setCurrentPlate(record)
              setEditDialogShow(true)
            }}
            icon={<EditFilled />}
            title="编辑"
            disabled={rightsArr[2]}
          />
          <Button
            action={() => {
              setCurrentPlate(record)
              setDelDialogShow(true)
            }}
            icon={<DeleteFilled />}
            title="删除"
            danger
            disabled={rightsArr[1]}
          />
        </Space>
      ),
    },
  ]

  const reqFn = async (pagenum, pagesize) => {
    setPagenum(pagenum)
    setPagesize(pagesize)
    const { data: result } = await list(pagenum, pagesize)
    const total = result.total
    const plates = result.plates.map((item) => ({
      ...item,
      key: item.id,
    }))
    setRoleList({
      total,
      list: plates,
    })
  }

  useEffect(() => {
    reqFn(1, 10)
  }, [])

  return (
    <div>
      <Content
        breadcrumbList={['动态管理', '分类列表']}
        columns={columns}
        data={roleList}
        reqFn={reqFn}
        headerContent={headerContent}
      />
      <AddDialog open={addDialogShow} hidden={() => setAddDialogShow(false)} submit={addSubmit} />
      <EditDialog
        open={editDialogShow}
        hidden={() => setEditDialogShow(false)}
        submit={editSubmit}
        plate={currentPlate}
      />
      <DelDialog open={delDialogShow} hidden={() => setDelDialogShow(false)} submit={delSubmit} />
    </div>
  )
})

export default Roles
