import React, { memo, useEffect, useState } from 'react'
import UserWrapper from './style'
import { list, search } from '@/api/users'
import Content from '../../../components/content'
import { Space, Switch, Button as AntdBtn, Input } from 'antd'
import AddDialog from './dialog/add'
import EditDialog from './dialog/edit'
import AssigningDialog from './dialog/assigning'
import DelDialog from './dialog/del'
import dayjs from 'dayjs'
import { DeleteFilled, EditFilled, SettingFilled } from '@ant-design/icons'
import Button from '../../../components/button'

const Users = memo(() => {
  const [userList, setUserList] = useState(null)
  const [searchContent, setSearchContent] = useState('')

  const [addDialogShow, setAddDialogShow] = useState(false)
  const [editDialogShow, setEditDialogShow] = useState(false)
  const [assigningDialogShow, setAssigningDialogShow] = useState(false)
  const [delDialogShow, setDelDialogShow] = useState(false)

  const changeStatus = (record) => {
    console.log(record)
  }

  const onSearch = async () => {
    reqFn(1, 10)
  }

  const headerContent = (
    <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
      <Input.Search
        placeholder="用户查询"
        allowClear
        onChange={(e) => setSearchContent(e.target.value)}
        onSearch={onSearch}
        size="large"
        style={{
          width: '350px',
          marginRight: '10px',
        }}
      />
      <AntdBtn type="primary" onClick={() => setAddDialogShow(true)} shape="round">
        添加用户
      </AntdBtn>
    </div>
  )

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => record.role.name,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => {
        return <Switch defaultChecked={text === 0} onChange={() => changeStatus(record)} />
      },
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
          <Button
            action={() => setAssigningDialogShow(true)}
            icon={<SettingFilled />}
            title="分配角色"
            other
            danger
          />
        </Space>
      ),
    },
  ]

  const reqFn = async (pagenum, pagesize) => {
    const { data: result } = !['', undefined].includes(searchContent)
      ? await search(searchContent, pagenum, pagesize)
      : await list(pagenum, pagesize)
    const total = result.total
    const users = result.users.map((item) => ({
      ...item,
      key: item.id,
    }))
    setUserList({
      total,
      list: users,
    })
  }

  useEffect(() => {
    reqFn(1, 10)
  }, [])

  return (
    <UserWrapper>
      <Content
        breadcrumbList={['用户管理', '用户列表']}
        columns={columns}
        data={userList}
        reqFn={reqFn}
        headerContent={headerContent}
      />
      <AddDialog open={addDialogShow} hidden={() => setAddDialogShow(false)} />
      <EditDialog open={editDialogShow} hidden={() => setEditDialogShow(false)} />
      <DelDialog open={delDialogShow} hidden={() => setDelDialogShow(false)} />
      <AssigningDialog open={assigningDialogShow} hidden={() => setAssigningDialogShow(false)} />
    </UserWrapper>
  )
})

export default Users
