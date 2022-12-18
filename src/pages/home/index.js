import React, { useEffect, useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
const { Header, Content, Sider } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    }
  }
  const items = [
    getItem('用户管理', '1', <UserOutlined />, [getItem('用户列表', '/users')]),
    getItem('权限管理', '2', <UserOutlined />, [
      getItem('角色列表', '/roles'),
      getItem('权限列表', '/rights'),
    ]),
    getItem('动态管理', '3', <UserOutlined />, [
      getItem('动态列表', '/moments'),
      getItem('分类列表', '/plates'),
    ]),
  ]

  const changePage = (item) => {
    navigate(item.key)
  }

  useEffect(() => {
    navigate('/users')
  }, [])

  return (
    <Layout>
      <Header className="header" theme="dark">
        <div className="logo" />
      </Header>
      <Layout style={{ minWidth: '1200px' }}>
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          style={{
            minHeight: 'calc(100vh - 64px)',
          }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['/users']}
            defaultOpenKeys={['1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
            theme="dark"
            onClick={changePage}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
            position: 'relative',
          }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default App
