/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2025-05-05 18:24:32
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2025-05-05 21:19:36
 */
'use client'

import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import {
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  BlockOutlined,
  ExperimentOutlined,
  ApiOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { usePathname, useRouter } from 'next/navigation'

const { Header, Sider, Content } = Layout

const menuItems = [
	{
		key: 'web3d',
		icon: <AppstoreOutlined />,
		label: 'Web 3D',
		children: [
			{
				key: '/menu/web3d/three',
				icon: <BlockOutlined />,
				label: 'Three.js技术',
			},
		],
	},
	{
		key: '/menu/settings',
		icon: <SettingOutlined />,
		label: '系统设置',
	},
]

export function MenuLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Layout className="h-screen">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        className="h-screen border-r border-gray-800 transition-all duration-300"
        theme="dark"
        width={200}
        collapsedWidth={80}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-800 overflow-hidden">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent whitespace-nowrap transition-all duration-300">
            {collapsed ? 'WL' : 'Web Learned'}
          </span>
        </div>
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          className="border-0"
        />
      </Sider>
      <Layout className="h-screen bg-gray-50">
        <Header className="px-6 bg-white flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            {collapsed ? (
              <MenuUnfoldOutlined 
                className="text-xl cursor-pointer !text-white transition-colors" 
                onClick={() => setCollapsed(false)} 
              />
            ) : (
              <MenuFoldOutlined 
                className="text-xl cursor-pointer !text-white transition-colors" 
                onClick={() => setCollapsed(true)} 
              />
            )}
          </div>
        </Header>
        <Content className="m-6 p-6 bg-white rounded-lg shadow-sm overflow-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
} 