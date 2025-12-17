import { SettingClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new SettingClassReq()} >
            <Form.Item label='设置id' name='id' >
                <Input placeholder='请输入设置id' ></Input>
            </Form.Item>
            <Form.Item label='设置键' name='key' >
                <Input placeholder='请输入设置键' allowClear ></Input>
            </Form.Item>
            <Form.Item label='设置值' name='value' >
                <Input placeholder='请输入设置值' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

