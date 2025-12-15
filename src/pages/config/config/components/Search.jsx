import { ConfigClassReq } from '../types'
import { Form, Input, Button, Select } from 'antd'
import { useTable } from '@/context/TableProvider'

export default function Search({ tempalteList }) {
    const [form] = Form.useForm()
    const { loading, onSearch } = useTable()
    const handleSearch = () => {
        onSearch(form.getFieldsValue())
    }
    const handleReset = () => {
        form.resetFields()
        onSearch(form.getFieldsValue())

    }
    return (
        <Form layout='inline' form={form} initialValues={new ConfigClassReq()} >
            <Form.Item label='配置id' name='id' >
                <Input placeholder='请输入配置id' ></Input>
            </Form.Item>
            <Form.Item label='配置名称' name='title' >
                <Input placeholder='请输入配置名称' allowClear ></Input>
            </Form.Item>
            <Form.Item label='模板名称' name='template_id' >
                <Select allowClear options={tempalteList} fieldNames={{ label: 'title', value: 'template_id' }} placeholder='请选择模板名称' >
                </Select>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >查询</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}