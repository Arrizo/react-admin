import { CrontabClassReq } from '../types'
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
        <Form layout='inline' form={form} initialValues={new CrontabClassReq()} >
            <Form.Item label='任务id' name='id' >
                <Input placeholder='请输入任务id' ></Input>
            </Form.Item>
            <Form.Item label='任务名称' name='name' >
                <Input placeholder='请输入任务名称' allowClear ></Input>
            </Form.Item>
            <Form.Item label='Cron表达式' name='expression' >
                <Input placeholder='请输入Cron表达式' allowClear ></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}

