/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2025-05-05 19:27:30
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2025-05-05 21:21:17
 */

'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function DetailLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='zh-CN'>
			<body>
				<AntdRegistry>
					<div className='w-full h-screen'>{children}</div>
				</AntdRegistry>
			</body>
		</html>
	)
} 