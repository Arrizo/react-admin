import { Modal, Form, Select } from 'antd'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { apiGetAgentLine, apiPublish } from '@/api/config/index'
const PusherModal = forwardRef(({ tempalteList }, ref) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [lines, setLines] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        showModal: () => setIsOpen(true)
    }))
    const getAgentLine = async () => {
        const { code, data } = await apiGetAgentLine()
        if (code == 200) {
            setLines(data)
        }
    }
    const onCancel = (e) => {
        form.resetFields()
        setIsOpen(false)
    }
    //
    const onOk = async (e) => {
        try {
            await form.validateFields()
            setLoading(true)
            const { code } = await apiPublish(form.getFieldsValue())
            if (code != 200) throw ''
            setLoading(false)
            onCancel()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getAgentLine()
    }, [])
    return (
        <Modal open={isOpen} width={600} title='操作' onCancel={onCancel} onOk={onOk} confirmLoading={loading} >
            <Form form={form} initialValues={{ line_id: null, template_id: null }} autoComplete='off'>
                <Form.Item label='线路' name='line_id' rules={[{ required: true, message: '请选择路线' }]}>
                    <Select placeholder='请选择路线' options={lines} allowClear fieldNames={{ label: 'name', value: 'id' }} />
                </Form.Item>
                <Form.Item label='模板' name='template_id' rules={[{ required: true, message: '请选择模板' }]} >
                    <Select placeholder='请选择模板' allowClear options={tempalteList} fieldNames={{ label: 'title', value: 'template_id' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default PusherModal
