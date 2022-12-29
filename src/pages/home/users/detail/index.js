import React, { memo, useEffect, useState } from 'react'
import { detail } from '@/api/users'
import Content from '@/components/content'
import { useLocation, useParams } from 'react-router-dom'
import { Descriptions, Image } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const UserDetail = memo(() => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  const reqFn = async (userId) => {
    const result = await detail(userId)
    setUser(result.data)
  }

  useEffect(() => {
    if (!userId) return
    reqFn(userId)
  }, [userId])

  return (
    <Content
      breadcrumbList={[
        '用户管理',
        {
          label: '用户列表',
          href: '#/users',
        },
        userId,
      ]}>
      <Descriptions
        title="用户详情"
        column={3}
        bordered
        extra={
          <a
            onClick={(e) => {
              e.preventDefault()
              window.history.go(-2)
            }}>
            返回上一级 <RightOutlined />
          </a>
        }>
        <Descriptions.Item label="头像">
          <Image src={`${user?.avatar_url}?type=small`} width={200} height={200} />
        </Descriptions.Item>
        <Descriptions.Item label="昵称">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{user?.gender ? '女' : '男'}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="出生日期">
          {dayjs(user?.birthday).format('YYYY / MM / DD')}
        </Descriptions.Item>
        <Descriptions.Item label="角色">{user?.role?.name}</Descriptions.Item>
        <Descriptions.Item label="动态数">{user?.momentCount}</Descriptions.Item>
        <Descriptions.Item label="关注数">{user?.careCount}</Descriptions.Item>
        <Descriptions.Item label="粉丝数">{user?.fansCount}</Descriptions.Item>
        <Descriptions.Item label="被收藏数">{user?.collectCount}</Descriptions.Item>
        <Descriptions.Item label="被点赞数">
          {user && user?.momentLike + user?.commentLike}
        </Descriptions.Item>
        <Descriptions.Item label="个人地址">
          <span style={{ marginRight: '10px' }}>{user?.address?.parent?.name}</span>
          <span>{user?.address?.children?.name}</span>
        </Descriptions.Item>
        <Descriptions.Item label="个人介绍">{user?.introduction}</Descriptions.Item>
      </Descriptions>
    </Content>
  )
})

export default UserDetail
