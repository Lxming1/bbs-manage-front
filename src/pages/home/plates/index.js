import React, { memo, useEffect, useState } from 'react'
import { list } from '@/api/plate'
import Content from '../../../components/content'
import { Space, Button as AntdBtn, Input } from 'antd'
import AddDialog from './dialog/add'
import EditDialog from './dialog/edit'
import AssigningDialog from './dialog/assigning'
import DelDialog from './dialog/del'
import dayjs from 'dayjs'
import { DeleteFilled, EditFilled, SettingFilled } from '@ant-design/icons'
import Button from '../../../components/button'

const Roles = memo(() => {
  const [roleList, setRoleList] = useState(null)

  const [addDialogShow, setAddDialogShow] = useState(false)
  const [editDialogShow, setEditDialogShow] = useState(false)
  const [assigningDialogShow, setAssigningDialogShow] = useState(false)
  const [delDialogShow, setDelDialogShow] = useState(false)

  const changeStatus = (record) => {
    console.log(record)
  }

  const headerContent = (
    <AntdBtn
      type="primary"
      onClick={() => setAddDialogShow(true)}
      shape="round"
      style={{ marginBottom: '10px' }}>
      添加板块
    </AntdBtn>
  )

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
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button action={() => setEditDialogShow(true)} icon={<EditFilled />} title="编辑" />
          <Button
            action={() => setDelDialogShow(true)}
            icon={<DeleteFilled />}
            title="删除"
            danger
          />
        </Space>
      ),
    },
  ]

  const reqFn = async (pagenum, pagesize) => {
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
        breadcrumbList={['权限管理', '角色列表']}
        columns={columns}
        data={roleList}
        reqFn={reqFn}
        headerContent={headerContent}
      />
      <AddDialog open={addDialogShow} hidden={() => setAddDialogShow(false)} />
      <EditDialog open={editDialogShow} hidden={() => setEditDialogShow(false)} />
      <DelDialog open={delDialogShow} hidden={() => setDelDialogShow(false)} />
      <AssigningDialog open={assigningDialogShow} hidden={() => setAssigningDialogShow(false)} />
    </div>
  )
})

export default Roles
