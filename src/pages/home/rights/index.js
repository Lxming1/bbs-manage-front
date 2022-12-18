import React, { memo, useEffect, useState } from 'react'
import UserWrapper from './style'
import { list } from '@/api/rights'
import Content from '../../../components/content'
import { Tag } from 'antd'
import dayjs from 'dayjs'

const Roles = memo(() => {
  const [roleList, setRoleList] = useState(null)
  const level = [
    {
      label: '一级',
      color: 'blue',
    },
    {
      label: '二级',
      color: 'green',
    },
    {
      label: '三级',
      color: 'orange',
    },
    {
      label: '四级',
      color: 'red',
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '权限等级',
      key: 'level',
      dataIndex: 'level',
      render: (text) => <Tag color={level[text].color}>{level[text].label}</Tag>,
    },
  ]

  const reqFn = async () => {
    const { data: result } = await list()
    const total = result.total
    console.log(result)
    const rights = result.rights.map((item) => ({
      ...item,
      key: item.id,
    }))
    setRoleList({
      total,
      list: rights,
    })
  }

  useEffect(() => {
    reqFn()
  }, [])

  return (
    <Content
      breadcrumbList={['权限管理', '权限列表']}
      columns={columns}
      data={roleList}
      reqFn={reqFn}
      noPage
    />
  )
})

export default Roles
