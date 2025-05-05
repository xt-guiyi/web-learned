/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2025-05-05 20:18:41
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2025-05-05 20:26:42
 */
import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Geist, Geist_Mono } from 'next/font/google'
import { MenuLayout } from './menuLayout'
import '@/app/globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Web Learned',
	description: 'Web Learned 后台管理系统',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='zh-CN'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AntdRegistry>
					<MenuLayout>{children}</MenuLayout>
				</AntdRegistry>
			</body>
		</html>
	)
}
