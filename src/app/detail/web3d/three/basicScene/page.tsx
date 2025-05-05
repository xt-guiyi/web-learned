/*
 * @Author: xt-guiyi 1661219752@qq.com
 * @Date: 2025-05-05 18:43:07
 * @LastEditors: xt-guiyi 1661219752@qq.com
 * @LastEditTime: 2025-05-05 21:51:55
 */
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

// 创建 GUI 控制面板
function createGUI(
  mesh: THREE.Mesh, 
  pointLight: THREE.PointLight,
  ambientLight: THREE.AmbientLight, 
  camera: THREE.PerspectiveCamera, 
  controls: OrbitControls, 
  lightHelper: THREE.PointLightHelper
) {
  const gui = new GUI()

  // 立方体控制
  const meshFolder = gui.addFolder('立方体').close()
  
  // 位置控制
  const position = meshFolder.addFolder('位置').close()
  position.add(mesh.position, 'x', -200, 200, 1).name('X轴位置')
  position.add(mesh.position, 'y', -200, 200, 1).name('Y轴位置')
  position.add(mesh.position, 'z', -200, 200, 1).name('Z轴位置')

  // 旋转控制
  const rotation = meshFolder.addFolder('旋转').close()
  rotation.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01).name('X轴旋转')
  rotation.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01).name('Y轴旋转')
  rotation.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01).name('Z轴旋转')

  // 缩放控制
  const scale = meshFolder.addFolder('缩放').close()
  scale.add(mesh.scale, 'x', 0.1, 2, 0.1).name('X轴缩放')
  scale.add(mesh.scale, 'y', 0.1, 2, 0.1).name('Y轴缩放')
  scale.add(mesh.scale, 'z', 0.1, 2, 0.1).name('Z轴缩放')

  // 材质控制
  const material = meshFolder.addFolder('材质').close()
  material.addColor(mesh.material as THREE.MeshLambertMaterial, 'color').name('颜色')
  material.add((mesh.material as THREE.MeshLambertMaterial), 'transparent').name('透明')
  material.add((mesh.material as THREE.MeshLambertMaterial), 'opacity', 0, 1, 0.01).name('透明度')

  // 光源控制
  const lightFolder = gui.addFolder('灯光').close()

  // 点光源控制
  const pointLightFolder = lightFolder.addFolder('点光源').close()
  pointLightFolder.add(pointLight, 'visible').name('显示点光源')
    .onChange((visible: boolean) => {
      lightHelper.visible = visible
    })
  
  // 点光源位置控制
  const pointLightPosition = pointLightFolder.addFolder('位置').close()
  pointLightPosition.add(pointLight.position, 'x', -200, 200, 1).name('X轴位置')
    .onChange(() => lightHelper.update())
  pointLightPosition.add(pointLight.position, 'y', -200, 200, 1).name('Y轴位置')
    .onChange(() => lightHelper.update())
  pointLightPosition.add(pointLight.position, 'z', -200, 200, 1).name('Z轴位置')
    .onChange(() => lightHelper.update())

  // 点光源参数
  const pointLightParams = pointLightFolder.addFolder('参数').close()
  pointLightParams.add(pointLight, 'intensity', 0, 20000, 100).name('强度')
  pointLightParams.addColor(pointLight, 'color').name('颜色')
    .onChange(() => lightHelper.update())

  // 环境光控制
  const ambientLightFolder = lightFolder.addFolder('环境光').close()
  ambientLightFolder.add(ambientLight, 'visible').name('显示环境光')
  ambientLightFolder.add(ambientLight, 'intensity', 0, 2, 0.1).name('强度')
  ambientLightFolder.addColor(ambientLight, 'color').name('颜色')

  // 相机控制
  const cameraFolder = gui.addFolder('相机').close()
  
  // 相机位置
  const cameraPosition = cameraFolder.addFolder('位置').close()
  cameraPosition.add(camera.position, 'x', -500, 500, 1).name('X轴位置')
    .onChange(() => camera.lookAt(mesh.position))
  cameraPosition.add(camera.position, 'y', -500, 500, 1).name('Y轴位置')
    .onChange(() => camera.lookAt(mesh.position))
  cameraPosition.add(camera.position, 'z', -500, 500, 1).name('Z轴位置')
    .onChange(() => camera.lookAt(mesh.position))

  // 相机参数
  const cameraParams = cameraFolder.addFolder('参数').close()
  cameraParams.add(camera, 'fov', 30, 120, 1).name('视场角')
    .onChange(() => camera.updateProjectionMatrix())
  cameraParams.add(camera, 'near', 0.1, 100, 0.1).name('近平面')
    .onChange(() => camera.updateProjectionMatrix())
  cameraParams.add(camera, 'far', 100, 2000, 10).name('远平面')
    .onChange(() => camera.updateProjectionMatrix())

  // 控制器参数
  const controlsFolder = cameraFolder.addFolder('轨道控制器').close()
  controlsFolder.add(controls, 'enableDamping').name('启用阻尼')
  controlsFolder.add(controls, 'dampingFactor', 0.01, 0.2, 0.01).name('阻尼系数')
  controlsFolder.add(controls, 'enableZoom').name('启用缩放')
  controlsFolder.add(controls, 'enableRotate').name('启用旋转')
  controlsFolder.add(controls, 'enablePan').name('启用平移')
  controlsFolder.add(controls, 'autoRotate').name('自动旋转')
  controlsFolder.add(controls, 'autoRotateSpeed', -10, 10, 0.1).name('自动旋转速度')

  return gui
}

export default function BasicPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 创建场景
    const scene = new THREE.Scene()

    // 创建立方体
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color('orange'),
      transparent: true,
      opacity: 1
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 10000)
    pointLight.position.set(80, 80, 80)
    scene.add(pointLight)

    // 添加光源位置辅助器
    const lightHelper = new THREE.PointLightHelper(pointLight, 10)
    scene.add(lightHelper)

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // 添加坐标轴辅助
    const axesHelper = new THREE.AxesHelper(200)
    scene.add(axesHelper)

    // 设置相机
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    camera.position.set(200, 200, 200)
    camera.lookAt(mesh.position)

    // 设置渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    containerRef.current.appendChild(renderer.domElement)

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // 启用阻尼效果
    controls.dampingFactor = 0.05 // 设置阻尼系数

    // 创建 GUI 控制面板
    const gui = createGUI(mesh, pointLight, ambientLight, camera, controls, lightHelper)

    // 渲染函数
    function animate() {
      controls.update() // 更新控制器
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // 处理窗口大小变化
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
      gui.destroy()
    }
  }, [])

  return (
    <div className="w-full h-screen" ref={containerRef}></div>
  )
} 