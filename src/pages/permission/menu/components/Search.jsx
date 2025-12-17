import { MenuClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new MenuClassReq()} >
            <Form.Item label='菜单id' name='id' >
                <Input placeholder='请输入菜单id' ></Input>
            </Form.Item>
            <Form.Item label='菜单名称' name='name' >
                <Input placeholder='请输入菜单名称' allowClear ></Input>
            </Form.Item>
            <Form.Item label='路由路径' name='path' >
                <Input placeholder='请输入路由路径' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

