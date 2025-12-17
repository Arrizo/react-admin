import { ActivityConfigClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new ActivityConfigClassReq()} >
            <Form.Item label='配置id' name='id' >
                <Input placeholder='请输入配置id' ></Input>
            </Form.Item>
            <Form.Item label='配置名称' name='title' >
                <Input placeholder='请输入配置名称' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

