import React, { memo, useEffect, useState } from 'react'
import { list, search, add, edit, del, assigning } from '@/api/users'
import Content from '../../../components/content'
import { Space, Switch, Button as AntdBtn, Input } from 'antd'
import AddDialog from './dialog/add'
import EditDialog from './dialog/edit'
import AssigningDialog from './dialog/assigning'
import DelDialog from './dialog/del'
import dayjs from 'dayjs'
import { DeleteFilled, EditFilled, SettingFilled } from '@ant-design/icons'
import Button from '../../../components/button'
import { xmMessage } from '../../../utils'

const Users = memo(() => {
  const profile = JSON.parse(sessionStorage.getItem('user'))
  const [userList, setUserList] = useState(null)
  const [searchContent, setSearchContent] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [pagenum, setPagenum] = useState(1)
  const [pagesize, setPagesize] = useState(10)

  const [addDialogShow, setAddDialogShow] = useState(false)
  const [editDialogShow, setEditDialogShow] = useState(false)
  const [assigningDialogShow, setAssigningDialogShow] = useState(false)
  const [delDialogShow, setDelDialogShow] = useState(false)

  const changeStatus = async (record) => {
    const status = record.status === 0 ? 1 : 0
    const result = await edit(record.id, { status })
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
  }

  const addSubmit = async (email, password) => {
    const result = await add(email, password)
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setAddDialogShow(false)
  }
  const editSubmit = async (uid, name, password) => {
    const isProfile = profile.id === currentUser.id
    let result
    if (isProfile) {
      result = await edit(uid, { name, password })
    } else {
      result = await edit(uid, { name })
    }
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setEditDialogShow(false)
  }

  const delSubmit = async () => {
    const result = await del(currentUser.id)
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setDelDialogShow(false)
  }

  const assignSubmit = async (userId, roleId) => {
    if (!roleId) return
    const result = await assigning(userId, roleId)
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setAssigningDialogShow(false)
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
          <Button
            action={() => {
              setCurrentUser(record)
              setEditDialogShow(true)
            }}
            icon={<EditFilled />}
            title="编辑用户"
          />
          <Button
            action={() => {
              setCurrentUser(record)
              setDelDialogShow(true)
            }}
            icon={<DeleteFilled />}
            title="删除用户"
            danger
          />
          <Button
            action={() => {
              setCurrentUser(record)
              setAssigningDialogShow(true)
            }}
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
    setPagenum(pagenum)
    setPagesize(pagesize)
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
    <div>
      <Content
        breadcrumbList={['用户管理', '用户列表']}
        columns={columns}
        data={userList}
        reqFn={reqFn}
        headerContent={headerContent}
      />
      <AddDialog open={addDialogShow} hidden={() => setAddDialogShow(false)} submit={addSubmit} />
      <EditDialog
        open={editDialogShow}
        hidden={() => setEditDialogShow(false)}
        submit={editSubmit}
        user={currentUser}
        isProfile={profile?.id === currentUser?.id}
      />
      <DelDialog open={delDialogShow} hidden={() => setDelDialogShow(false)} submit={delSubmit} />
      <AssigningDialog
        open={assigningDialogShow}
        hidden={() => setAssigningDialogShow(false)}
        user={currentUser}
        submit={assignSubmit}
      />
    </div>
  )
})

export default Users
