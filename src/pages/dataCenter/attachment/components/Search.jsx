import { AttachmentClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new AttachmentClassReq()} >
            <Form.Item label='附件id' name='id' >
                <Input placeholder='请输入附件id' ></Input>
            </Form.Item>
            <Form.Item label='文件名' name='filename' >
                <Input placeholder='请输入文件名' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

