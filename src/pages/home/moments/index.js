import { Space, Button, Input, Tag } from 'antd'
import dayjs from 'dayjs'
import { getMoments, searchMoment } from '../../../api/moment'
import { ScanOutlined } from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import Content from '../../../components/content'

export default memo(() => {
  const [moments, setMoments] = useState([])
  const [searchContent, setSearchContent] = useState('')
  const tags = [
    {
      color: 'blue',
      label: '待审核',
    },
    {
      color: 'green',
      label: '已通过',
    },
    {
      color: 'red',
      label: '未通过',
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
      render: (text, record) => <a href={`#/moments/${record.id}`}>{text}</a>,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: '板块',
      dataIndex: 'plate',
      key: 'plate',
      ellipsis: true,
      width: 100,
      render: (text) => <span>{text.name}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 85,
      render: (text) => <Tag color={tags[text].color}>{tags[text].label}</Tag>,
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 150,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      width: 150,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const onSearch = async () => {
    reqFn(1, 10)
  }

  const headerContent = (
    <Input.Search
      placeholder="动态查询"
      allowClear
      onChange={(e) => setSearchContent(e.target.value)}
      onSearch={onSearch}
      size="large"
      style={{
        width: '350px',
        marginRight: '10px',
        marginBottom: '10px',
      }}
    />
  )

  const reqFn = async (pagenum, pagesize) => {
    const {
      data: { moments, total },
    } = !['', undefined].includes(searchContent)
      ? await searchMoment(searchContent, pagenum, pagesize)
      : await getMoments(pagenum, pagesize)
    const list = moments.map((item) => ({
      ...item,
      key: item.id,
    }))
    setMoments({
      total,
      list,
    })
  }

  useEffect(() => {
    reqFn(1, 10)
  }, [])

  return (
    <Content
      breadcrumbList={['动态管理', '动态列表']}
      columns={columns}
      data={moments}
      reqFn={reqFn}
      headerContent={headerContent}
    />
  )
})
