import { Table, Space, Button } from 'antd'
import dayjs from 'dayjs'
import { ScanOutlined } from '@ant-design/icons'
import { memo } from 'react'

export default memo(({ data, reqFn }) => {
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
      render: (text, record) => <a href={`#/examine/${record.id}`}>{text}</a>,
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
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button href={`#/examine/${record.id}`} icon={<ScanOutlined />} type="primary">
            审核
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data?.moments}
      style={{ minWidth: '100%', height: '100%' }}
      bordered
      pagination={{
        position: ['bottomCenter'],
        onChange: (pagenum, pagesize) => {
          reqFn(pagenum, pagesize)
        },
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 50, 100],
        total: data?.total,
        showTotal: (total) => (
          <span style={{ marginRight: '10px', lineHeight: '32px' }}>{`共${total}条`}</span>
        ),
        hideOnSinglePage: true,
      }}
    />
  )
})
