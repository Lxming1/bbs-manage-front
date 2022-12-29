import React, { memo, useEffect, useState } from 'react'
import { getMoment, getCommentsByMomentId } from '@/api/moment'
import Content from '@/components/content'
import { useNavigate, useParams } from 'react-router-dom'
import { Descriptions, Image, Tag, Tree, Button, Switch } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { listTransTree, xmMessage } from '../../../../utils'
import { useRights } from '../../../../hooks'
import { changeCommentStatus } from '../../../../api/moment'

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

const rightsObj = [
  {
    label: '修改评论状态',
    rights: 24,
  },
]

const Roles = memo(() => {
  const { momentId } = useParams()
  const [moment, setMoment] = useState(null)
  const [comments, setComments] = useState(null)
  const rightsArr = useRights(rightsObj)

  const reqFn = async (momentId) => {
    const { data: result } = await getMoment(momentId)
    let { data: comments } = await getCommentsByMomentId(momentId)
    setMoment(result)
    setComments(listTransTree(comments, 'commentId'))
  }

  const onChangeStatus = async (item) => {
    const status = item.status === 0 ? 1 : 0
    const { data: res } = await changeCommentStatus(item.id, status)
    if (res) {
      setComments((comments) =>
        comments.map((comment) => {
          if (comment.id === item.id) {
            comment.status = status
          }
          return comment
        })
      )
    } else {
      xmMessage(1, '错误')
    }
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
          label: '动态列表',
          href: '#/moments',
        },
        momentId,
      ]}>
      <Descriptions
        title="动态详情"
        bordered
        column={3}
        extra={
          <a href="#/moments">
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
        <Descriptions.Item label="评论" span={3}>
          {comments?.length ? (
            <Tree
              treeData={comments}
              titleRender={(node) => (
                <div key={node.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <a href={`#/users/${node.author.id}`}>{node.author.name}：</a>
                  <span>{node.content}</span>
                  <Switch
                    size="small"
                    style={{ marginLeft: '10px' }}
                    checked={node.status === 0}
                    onChange={() => onChangeStatus(node)}
                    disabled={rightsArr[0]}
                  />
                </div>
              )}
              selectable={false}
            />
          ) : (
            <span style={{ color: '#999aaa' }}>无评论</span>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Content>
  )
})

export default Roles
