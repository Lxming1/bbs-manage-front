import { memo, useState } from 'react'
import HeaderWrapper from './style'
import { Popover, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, PoweroffOutlined, BellFilled, SearchOutlined } from '@ant-design/icons'

export default memo(() => {
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem('bbs-user')
    navigate('/')
  }

  const userInfo = sessionStorage.getItem('user')

  const rightMenu = () => (
    <ul className="rightMenu">
      <li onClick={logout}>
        <a href="#/login">
          <PoweroffOutlined style={{ marginRight: '6px' }} />
          退出
        </a>
      </li>
    </ul>
  )
  return (
    <HeaderWrapper>
      <div className="mainBox">
        <div className="leftContent">
          <div className="logo">
            <img src={require('@/assets/img/logo.png')} alt="PYPBBS" />
          </div>
        </div>
        <div className="rightContent">
          <Popover placement="bottom" content={rightMenu()} trigger="hover">
            <div className="avatar">
              <img src={userInfo?.avatar_url} alt="" />
            </div>
          </Popover>
        </div>
      </div>
    </HeaderWrapper>
  )
})
