
import { Modal, Form, Select, Input, Row, Col, Upload, Radio, message } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { apiUpload, apiEditOrAddUser } from '@/api/user/index'
const UserModal = forwardRef(({ onFresch }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [form] = Form.useForm()

    class UserInfoClass {
        avatar = ''
        username = ''
        nickname = ''
        password = ''
        phone = ''
        email = ''
        user_type = 100
        remark = ''
        status = 1
    }

    useImperativeHandle(ref, () => ({
        showModal: (row) => {
            if (row) {
                form.setFieldsValue(row)
                form.setFieldValue('backend_setting', [])
                setFileList([{ url: row.avatar }])
            }
            setIsOpen(true)
        }
    }))
    const onCancel = () => {
        form.resetFields()
        setFileList([])
        setIsOpen(false)
    }

    // 使用 customRequest 自定义上传，避免 onChange 多次触发导致重复调用
    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            let formData = new FormData()
            formData.append('file', file)
            const { code, data } = await apiUpload(formData)
            if (code == 200) {
                form.setFieldsValue({ avatar: data.url })
                setFileList([{ url: data.url }])
                onSuccess?.(data)
            } else {
                onError?.(new Error('上传失败'))
            }
        } catch (error) {
            onError?.(error)
        }
        console.log('customRequest')
    }
    const onOk = async () => {
        try {
            setLoading(true)
            await form.validateFields()
            const { code } = await apiEditOrAddUser(form.getFieldValue())
            if (code != 200) throw ''
            setLoading(false)
            message.success('添加成功')
            onFresch()
            onCancel()
        } catch (error) {
            setLoading(false)
        }

    }
    const onChange = () => {
        if (fileList.length) {
            // 有数据的清空
            form.setFieldsValue({ avatar: '' })
            setFileList([])
        }
    }
    return (
        <Modal open={isOpen} width={700} title='新增' onCancel={onCancel} onOk={onOk} confirmLoading={loading}>
            <Form autoComplete='off' form={form} labelCol={{ flex: '80px' }}
                wrapperCol={{ flex: '1' }} initialValues={new UserInfoClass()} >
                <Form.Item label='头像' name='avatar' rules={[{ required: true, message: '请上传头像' }]}  >
                    <Upload
                        maxCount={1}
                        listType='picture-card'
                        fileList={fileList}
                        onChange={onChange}
                        customRequest={customRequest}
                    >
                        {!fileList?.length && ' + Upload'}
                    </Upload>
                </Form.Item>

                <Row gutter={16} >
                    <Col span={12} >
                        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}  >
                            <Input placeholder='请输入用户名'   ></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label='昵称' name='nickname' rules={[{ required: true, message: '请输入昵称' }]} >
                            <Input placeholder='请输入用户名' ></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} >
                    <Col span={12} >
                        <Form.Item label='密码' name='password' rules={[{ required: !form.getFieldValue('id'), message: '请输入密码' }]} >
                            <Input.Password placeholder='请输入密码' disabled={form.getFieldValue('id')}  ></Input.Password>
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label='手机' name='phone' rules={[{ required: true, message: '请输入手机' }]} >
                            <Input placeholder='请输入手机' ></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} >
                    <Col span={12} >
                        <Form.Item label='邮箱' name='email' rules={[{ required: true, message: '请输入邮箱' }]} >
                            <Input placeholder='请输入邮箱' ></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label='用户类型' name='user_type' >
                            <Radio.Group options={[{ label: '系统用户', value: 100 }, { label: '普通用户', value: 200 }]} optionType="button"
                                buttonStyle="solid" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label='备注' name='remark'>
                    <Input.TextArea placeholder='请输入备注' ></Input.TextArea>
                </Form.Item>

                <Form.Item label='状态' name='status' >
                    <Radio.Group options={[{ label: '启用', value: 1 }, { label: '禁用', value: 2 }]} />
                </Form.Item>

            </Form>

        </Modal>
    )
})
export default UserModal