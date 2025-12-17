import { DictionaryClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new DictionaryClassReq()} >
            <Form.Item label='字典id' name='id' >
                <Input placeholder='请输入字典id' ></Input>
            </Form.Item>
            <Form.Item label='字典名称' name='name' >
                <Input placeholder='请输入字典名称' allowClear ></Input>
            </Form.Item>
            <Form.Item label='字典编码' name='code' >
                <Input placeholder='请输入字典编码' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

