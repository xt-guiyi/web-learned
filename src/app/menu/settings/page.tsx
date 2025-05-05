'use client'

import { Form, Input, Button, Card, Switch, message } from 'antd'

export default function SettingsPage() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('设置已保存')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">系统设置</h1>
      <Card className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            siteName: 'Web Learned',
            siteDescription: 'Web Learned 后台管理系统',
            enableNotifications: true,
          }}
        >
          <Form.Item
            label="站点名称"
            name="siteName"
            rules={[{ required: true, message: '请输入站点名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="站点描述"
            name="siteDescription"
            rules={[{ required: true, message: '请输入站点描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="启用通知"
            name="enableNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
} 