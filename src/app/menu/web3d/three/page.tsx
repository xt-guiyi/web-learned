/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2025-05-05 18:43:07
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2025-05-05 21:55:02
 */
'use client'

import { Card, Row, Col } from 'antd'
import { 
  BoxPlotOutlined, 
  ExperimentOutlined, 
  ApiOutlined,
  BulbOutlined,
  CameraOutlined,
  RocketOutlined
} from '@ant-design/icons'

const scenes = [
  {
    key: 'basic',
    title: '基础场景',
    description: '创建一个基础的 Three.js 场景，包含场景、相机和渲染器',
    icon: <BoxPlotOutlined className="text-2xl"  />,
    path: '/detail/web3d/three/basicScene'
  },
  {
    key: 'geometry',
    title: '几何体',
    description: '学习 Three.js 中的各种几何体，如立方体、球体、圆柱体等',
    icon: <ExperimentOutlined className="text-2xl"  />,
    path: '/detail/web3d/three/basic/geometry'
  },
  {
    key: 'material',
    title: '材质',
    description: '探索不同的材质类型，如基础材质、标准材质、物理材质等',
    icon: <ApiOutlined className="text-2xl " />,
    path: '/new/web3d/three/basic/material'
  },
  {
    key: 'light',
    title: '光照',
    description: '了解不同类型的光源，如环境光、点光源、聚光灯等',
    icon: <BulbOutlined className="text-2xl " />,
    path: '/new/web3d/three/basic/light'
  },
  {
    key: 'camera',
    title: '相机',
    description: '学习相机的使用，包括透视相机和正交相机的区别',
    icon: <CameraOutlined className="text-2xl " />,
    path: '/new/web3d/three/basic/camera'
  },
  {
    key: 'animation',
    title: '动画',
    description: '创建简单的动画效果，学习动画循环和性能优化',
    icon: <RocketOutlined className="text-2xl" />,
    path: '/new/web3d/three/basic/animation'
  }
]

export default function BasicPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Three.js 基础教程</h1>
      </div>
      
      <Row gutter={[16, 16]}>
        {scenes.map(scene => (
          <Col xs={24} sm={12} lg={8} key={scene.key}>
            <a 
              href={scene.path} 
              className="block h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card
                hoverable
                className="h-full transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div>
                    {scene.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {scene.title}
                    </h3>
                    <p className="text-gray-600">
                      {scene.description}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  )
} 