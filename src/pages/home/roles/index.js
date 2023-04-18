import React, { memo, useEffect, useState } from 'react'
import { list, search, edit, add, assigning, del } from '@/api/roles'
import Content from '../../../components/content'
import { Space, Button as AntdBtn, Input } from 'antd'
import AddDialog from './dialog/add'
import EditDialog from './dialog/edit'
import AssigningDialog from './dialog/assigning'
import DelDialog from './dialog/del'
import dayjs from 'dayjs'
import { DeleteFilled, EditFilled, SettingFilled } from '@ant-design/icons'
import Button from '../../../components/button'
import { xmMessage } from '../../../utils'
import { useRights } from '../../../hooks'

const rightsObj = [
  {
    label: '添加角色',
    rights: 16,
  },
  {
    label: '删除角色',
    rights: 17,
  },
  {
    label: '编辑角色',
    rights: 19,
  },
  {
    label: '分配权限',
    rights: 18,
  },
]

const Roles = memo(() => {
  const rightsArr = useRights(rightsObj)
  const [roleList, setRoleList] = useState(null)
  const [searchContent, setSearchContent] = useState('')
  const [currentRole, setcurrentRole] = useState(null)
  const [pagenum, setPagenum] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  const [addDialogShow, setAddDialogShow] = useState(false)
  const [editDialogShow, setEditDialogShow] = useState(false)
  const [assigningDialogShow, setAssigningDialogShow] = useState(false)
  const [delDialogShow, setDelDialogShow] = useState(false)

  const addSubmit = async (name, desc) => {
    const result = await add({ name, desc })
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setAddDialogShow(false)
  }
  const editSubmit = async (rid, name, desc) => {
    const result = await edit(rid, { name, desc })
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setEditDialogShow(false)
  }

  const delSubmit = async () => {
    const result = await del(currentRole.id)
    await reqFn(pagenum, pagesize)
    xmMessage(result.code, result.message)
    setDelDialogShow(false)
  }

  const assignSubmit = async (roleId, rightsList) => {
    const result = await assigning(roleId, rightsList)
    rightsList.sort((a, b) => a - b)
    await reqFn(pagenum, pagesize)
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user.role.id === roleId) {
      user.rights = result.data
      sessionStorage.setItem('user', JSON.stringify(user))
    }
    xmMessage(result.code, result.message)
    setAssigningDialogShow(false)
  }

  const onSearch = async () => {
    reqFn(1, 10)
  }

  const headerContent = (
    <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
      <Input.Search
        placeholder="角色查询"
        allowClear
        onChange={(e) => setSearchContent(e.target.value)}
        onSearch={onSearch}
        size="large"
        style={{
          width: '350px',
          marginRight: '10px',
        }}
      />
      <AntdBtn
        type="primary"
        onClick={() => setAddDialogShow(true)}
        shape="round"
        disabled={rightsArr[0]}>
        添加角色
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
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '创建时间',
      key: 'create_at',
      dataIndex: 'create_at',
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm')
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            action={() => {
              setcurrentRole(record)
              setEditDialogShow(true)
            }}
            icon={<EditFilled />}
            title="编辑角色"
            disabled={rightsArr[2]}
          />
          <Button
            action={() => {
              setcurrentRole(record)
              setDelDialogShow(true)
            }}
            icon={<DeleteFilled />}
            title="删除角色"
            danger
            disabled={rightsArr[1]}
          />
          <Button
            action={() => {
              setcurrentRole(record)
              setAssigningDialogShow(true)
            }}
            icon={<SettingFilled />}
            title="分配权限"
            other
            danger
            disabled={rightsArr[3]}
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
    const roles = result.roles.map((item) => ({
      ...item,
      key: item.id,
    }))
    setRoleList({
      total,
      list: roles,
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
      <AddDialog open={addDialogShow} hidden={() => setAddDialogShow(false)} submit={addSubmit} />
      <EditDialog
        open={editDialogShow}
        hidden={() => setEditDialogShow(false)}
        submit={editSubmit}
        role={currentRole}
      />
      <DelDialog open={delDialogShow} hidden={() => setDelDialogShow(false)} submit={delSubmit} />
      <AssigningDialog
        open={assigningDialogShow}
        hidden={() => setAssigningDialogShow(false)}
        role={currentRole}
        submit={assignSubmit}
      />
    </div>
  )
})

export default Roles
