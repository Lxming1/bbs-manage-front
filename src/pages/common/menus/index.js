import { UserOutlined } from '@ant-design/icons'
import { memo } from 'react'
import { Menu } from 'antd'
import MenusWrapper from './style'

export default memo(() => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    }
  }
  const items = [
    getItem('用户管理', '/u', <UserOutlined />, [getItem('用户列表', '/users')]),
    getItem('权限管理', '/r', <UserOutlined />, [
      getItem('角色列表', '/roles'),
      getItem('权限列表', '/rights'),
    ]),
    getItem('动态管理', '/m', <UserOutlined />, [
      getItem('动态列表', '/moments'),
      getItem('分类列表', '/plate'),
    ]),
  ]

  return (
    <MenusWrapper>
      <Menu items={items} mode="inline" style={{ height: '100%', borderRight: 0 }} />
    </MenusWrapper>
  )
})
