import { TemplateClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new TemplateClassReq()} >
            <Form.Item label='模板id' name='template_id' >
                <Input placeholder='请输入模板id' ></Input>
            </Form.Item>
            <Form.Item label='模板名称' name='title' >
                <Input placeholder='请输入模板名称' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

