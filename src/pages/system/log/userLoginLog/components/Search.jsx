import { UserLoginLogClassReq } from '../types'
import { Form, Input, Button } from 'antd'

export default function Search({ loading, onSearch }) {
    const [form] = Form.useForm()
    const handleSearch = () => {
        onSearch(form.getFieldsValue())
    }
    const handleReset = () => {
        form.resetFields()
        onSearch(form.getFieldsValue())
    }
    return (
        <Form layout='inline' form={form} initialValues={new UserLoginLogClassReq()} >
            <Form.Item label='日志id' name='id' >
                <Input placeholder='请输入日志id' ></Input>
            </Form.Item>
            <Form.Item label='用户名' name='username' >
                <Input placeholder='请输入用户名' allowClear ></Input>
            </Form.Item>
            <Form.Item label='IP地址' name='ip' >
                <Input placeholder='请输入IP地址' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

