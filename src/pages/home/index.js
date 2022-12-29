import React, { useEffect, useState } from 'react'
import {
  AppstoreFilled,
  BulbFilled,
  FileTextFilled,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Popover } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { getMenus } from '../../api/auth'
const { Header, Sider } = Layout

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentKey, setCurrentKey] = useState('')
  const [openKey, setOpenKey] = useState(null)
  const [menuItems, setMenuItems] = useState(null)
  const user = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()

  const iconMap = {
    用户管理: <UserOutlined />,
    权限管理: <BulbFilled />,
    动态管理: <FileTextFilled />,
  }

  const logout = () => {
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  const rightMenu = () => (
    <ul className="rightMenu">
      <li onClick={() => (window.location.href = `#/users/${user.id}`)}>
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
    setOpenKey([item.keyPath[1]])
    navigate(item.key)
  }

  const onOpenChange = (item) => {
    setOpenKey(item)
  }

  useEffect(() => {
    let path = window.location.hash.slice(1)
    if (['', '/'].includes(path)) path = menuItems?.[0].children?.[0].key
    setCurrentKey(path)
    navigate(path)
    setOpenKey([
      menuItems?.find((item) => item?.children?.some((itema) => itema?.key === path))?.key,
    ])
  }, [window.location.hash, menuItems])

  useEffect(() => {
    getMenus().then(({ data: res }) => {
      setMenuItems(
        res.map((item) => {
          item.children = item?.children?.map((itemx) => ({
            ...itemx,
            icon: <AppstoreFilled />,
          }))
          return {
            ...item,
            icon: iconMap[item.label],
          }
        })
      )
      let path = window.location.hash.slice(1)
      if (['', '/'].includes(path)) path = '/users'
      setOpenKey([res.find((item) => item?.children?.some((itema) => itema?.key === path))?.key])
    })
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
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={menuItems}
            theme="dark"
            onClick={changePage}
            selectedKeys={currentKey}
            openKeys={openKey}
            onOpenChange={onOpenChange}
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
