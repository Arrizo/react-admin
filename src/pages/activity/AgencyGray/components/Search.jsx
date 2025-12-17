import { AgencyGrayClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new AgencyGrayClassReq()} >
            <Form.Item label='灰度id' name='id' >
                <Input placeholder='请输入灰度id' ></Input>
            </Form.Item>
            <Form.Item label='灰度名称' name='title' >
                <Input placeholder='请输入灰度名称' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

