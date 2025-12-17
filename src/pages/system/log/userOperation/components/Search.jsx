import { UserOperationClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new UserOperationClassReq()} >
            <Form.Item label='日志id' name='id' >
                <Input placeholder='请输入日志id' ></Input>
            </Form.Item>
            <Form.Item label='用户名' name='username' >
                <Input placeholder='请输入用户名' allowClear ></Input>
            </Form.Item>
            <Form.Item label='操作动作' name='action' >
                <Input placeholder='请输入操作动作' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

