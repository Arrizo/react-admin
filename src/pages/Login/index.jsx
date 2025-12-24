import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Card, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/store'
import { login } from '@/api/global'
import styles from './Login.module.less'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigete = useNavigate()
    const [form] = Form.useForm()
    const { setToken } = useAuthStore()
    // 上一个登录的路由
    const from = location?.state ?? '/'
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const { code, data } = await login(values)
            if (code != 200) throw new Error('登录失败')
            setToken(data.access_token);
            setLoading(false)
            message.success('登录成功')
            navigete(from, { replace: true })
        } catch (error) {
            message.error(error.message)
            setLoading(false)
        }
    }
    return (
        <section className={styles.loginContainer} >
            <Card title='后台登录管理系统' className={styles.loginCard} >
                <Form form={form} name='login' autoComplete='off' onFinish={onFinish}  >
                    <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]} >
                        <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]} >
                        <Input.Password prefix={<LockOutlined />} placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType='submit' loading={loading} block >登录</Button>
                    </Form.Item>
                </Form>

            </Card>
        </section>

    )
}
