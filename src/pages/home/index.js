import React, { useEffect, useState } from 'react'
import {
  LaptopOutlined,
  NotificationOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Popover } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
const { Header, Sider } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user'))
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

  const logout = () => {
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  const rightMenu = () => (
    <ul className="rightMenu">
      <li onClick={() => (window.location.href = `#/profile`)}>
        <a>
          <UserOutlined style={{ marginRight: '6px' }} />
          我的主页
        </a>
      </li>
      <li onClick={logout}>
        <a>
          <PoweroffOutlined style={{ marginRight: '6px' }} />
          退出
        </a>
      </li>
    </ul>
  )

  const changePage = (item) => {
    navigate(item.key)
  }

  useEffect(() => {
    navigate('/users')
  }, [])
  return (
    <Layout>
      <Header
        className="header"
        theme="dark"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '26px', letterSpacing: '3px' }}>
          后台管理系统
        </h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', fontSize: '14px', color: 'white' }}>
            {user?.name}，{user?.role?.name}
          </span>
          <Popover placement="bottom" content={rightMenu()} trigger="hover">
            <img
              src={user?.avatar_url}
              alt=""
              style={{ height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer' }}
            />
          </Popover>
        </div>
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
