import React, { memo, useEffect, useState } from 'react'
import { getMoment, checkMoment } from '@/api/moment'
import Content from '@/components/content'
import { useParams } from 'react-router-dom'
import { Descriptions, Image, Tag, Button } from 'antd'
import { xmMessage } from '@/utils'
import { RightOutlined } from '@ant-design/icons'

const Roles = memo(() => {
  const { momentId } = useParams()
  const [moment, setMoment] = useState(null)
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

  const check = async (status) => {
    const result = await checkMoment(momentId, status)
    xmMessage(result.code, '审批成功')
    window.location.href = '#/examine'
  }

  const reqFn = async (momentId) => {
    const { data: result } = await getMoment(momentId)
    setMoment(result)
  }

  useEffect(() => {
    if (!momentId) return
    reqFn(momentId)
  }, [momentId])

  return (
    <Content
      breadcrumbList={[
        '动态管理',
        {
          label: '动态审核',
          href: '#/examine',
        },
        momentId,
      ]}>
      <Descriptions
        title="动态详情"
        bordered
        column={3}
        extra={
          <a href="#/examine">
            返回上一级 <RightOutlined />
          </a>
        }>
        <Descriptions.Item label="板块">{moment?.plate?.name}</Descriptions.Item>
        <Descriptions.Item label="是否可见">
          {moment?.visible === 0 ? '可见' : '匿名'}
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          {moment?.status !== undefined && (
            <Tag color={tags[moment?.status].color}>{tags[moment?.status].label}</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="标题" span={3}>
          {moment?.title}
        </Descriptions.Item>
        <Descriptions.Item label="内容" span={3}>
          {moment?.content}
        </Descriptions.Item>
        <Descriptions.Item label="图片" span={3}>
          {moment?.images?.length ? (
            <Image.PreviewGroup style={{ display: 'flex' }}>
              {moment?.images?.map((item, index) => (
                <div
                  style={{
                    display: 'inline-block',
                    margin: '2.5px',
                    width: '214px',
                    height: '214px',
                    overflow: 'hidden',
                  }}
                  key={item + index}>
                  <Image src={`${item}?type=small`} preview={{ src: item }} width="214px" />
                </div>
              ))}
            </Image.PreviewGroup>
          ) : (
            <span style={{ color: '#999aaa' }}>无图片</span>
          )}
        </Descriptions.Item>
      </Descriptions>
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
        }}>
        <Button
          onClick={() => {
            window.history.go(-2)
          }}>
          返回
        </Button>
        <Button type="primary" danger style={{ margin: '20px' }} onClick={() => check(2)}>
          不通过
        </Button>
        <Button type="primary" onClick={() => check(1)}>
          通过
        </Button>
      </div>
    </Content>
  )
})

export default Roles
