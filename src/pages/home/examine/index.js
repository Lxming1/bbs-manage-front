import React, { memo, useEffect, useState } from 'react'
import { getMoments } from '@/api/moment'
import Content from '../../../components/content'
import { Input, Menu } from 'antd'
import TabItem from './table'
import { searchMoment } from '../../../api/moment'

const Roles = memo(() => {
  const [currentKey, setCurrentKey] = useState('await')
  const [moments, setMoments] = useState([])
  const [searchContent, setSearchContent] = useState('')

  const changePage = (menu) => {
    setCurrentKey(menu.key)
  }

  const reqFn = async (pagenum, pagesize) => {
    const {
      data: { moments, total },
    } = !['', undefined].includes(searchContent)
      ? await searchMoment(searchContent, pagenum, pagesize, currentKey)
      : await getMoments(pagenum, pagesize, currentKey)
    const list = moments.map((item) => ({
      ...item,
      key: item.id,
    }))
    setMoments({
      total,
      moments: list,
    })
  }

  const items = [
    {
      label: '待审核',
      key: 'await',
    },
    {
      label: '已通过',
      key: 'pass',
    },
    {
      label: '未通过',
      key: 'failed',
    },
  ]

  const onSearch = async () => {
    reqFn(1, 10)
  }

  useEffect(() => {
    reqFn(1, 10)
  }, [currentKey])
  return (
    <div>
      <Content
        breadcrumbList={[
          '动态管理',
          '动态审核',
          items.find((item) => item.key === currentKey).label,
        ]}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
          <div style={{ width: '246px' }}>
            <Menu items={items} mode="horizontal" onClick={changePage} activeKey={currentKey} />
          </div>
          <Input.Search
            placeholder="动态查询"
            allowClear
            onChange={(e) => setSearchContent(e.target.value)}
            onSearch={onSearch}
            size="large"
            style={{
              width: '350px',
            }}
          />
        </div>
        <TabItem data={moments} reqFn={reqFn} />
      </Content>
    </div>
  )
})

export default Roles
