/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2025-05-05 18:13:10
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2025-05-05 20:35:18
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/menu/web3d/three/basic')
  }, [])

  return null
}
