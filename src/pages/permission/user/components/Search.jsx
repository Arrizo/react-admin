import { Form, Input, Button } from 'antd'
import { UserReqClass } from '@/types/permission/user'
import { useTable } from '@/context/TableProvider'
export default function Search() {
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
        <Form layout='inline' form={form} initialValues={new UserReqClass()} >
            <Form.Item label='用户名' name='username' >
                <Input placeholder='请输入用户名'  ></Input>
            </Form.Item>
            <Form.Item label='昵称' name='nickname'  >
                <Input placeholder='请输入昵称'></Input>
            </Form.Item>
            <Button type='primary' onClick={handleSearch} loading={loading} >搜索</Button>
            <Button onClick={handleReset} >重置</Button>
        </Form>
    )
}