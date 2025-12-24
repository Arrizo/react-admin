
import { Modal, Form, Select, message } from 'antd'
import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react'
import { apiRoleList, apiGetRoleInfo, apiUpdateRole } from '@/api/permission/role'
const RoleModal = forwardRef(({ onFresch }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [form] = Form.useForm()
    let roleId = useRef('')
    class RoleInfoClass {
        role_codes = []
    }
    const getRoleList = async () => {
        const { code, data } = await apiRoleList({ page_size: 999 })
        if (code == 200) {
            setRoleList(data.list)
        }
    }
    useEffect(() => {
        getRoleList()
    }, [])
    useImperativeHandle(ref, () => ({
        showModal: async (id) => {
            roleId.current = id
            const { code, data } = await apiGetRoleInfo(id)
            if (code == 200) {
                const codes = data.map(i => i.code)
                form.setFieldsValue({ role_codes: codes })
            }
            setIsOpen(true)
        }
    }))
    const onCancel = () => {
        form.resetFields()
        setIsOpen(false)
    }
    const onOk = async () => {
        try {
            setLoading(true)
            await form.validateFields()
            const { code, message: sucessMessage } = await apiUpdateRole(roleId.current, form.getFieldValue())
            if (code != 200) throw new Error(sucessMessage)
            setLoading(false)
            message.success('修改成功')
            onFresch()
            onCancel()
        } catch (error) {
            message.error(error.message)
            setLoading(false)
        }

    }
    return (
        <Modal open={isOpen} width={500} title='赋予角色' onCancel={onCancel} onOk={onOk} confirmLoading={loading}>
            <Form autoComplete='off' form={form}
                initialValues={new RoleInfoClass()} >
                <Form.Item label='角色' name='role_codes' rules={[{ required: true, message: '请选择角色' }]}  >
                    <Select allowClear mode='multiple' placeholder='请选择角色' options={roleList} fieldNames={{ label: 'name', value: 'code' }} />
                </Form.Item>

            </Form>
        </Modal>
    )
})
export default RoleModal