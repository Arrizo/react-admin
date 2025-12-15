import { Table, Tag, Button, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, UserOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import UserModal from './UserModal'
import { apiUserDelete } from '@/api/user/index'
import { useRef } from 'react'
export default function TableList({ onPagination, tableData = [], total, loading, page_size, page }) {
    const userRef = useRef(null)
    const showUserModal = () => userRef.current.showModal()
    const hanlderEdit = (row) => {
        userRef.current.showModal(row)
    }
    const hanlderDel = async (row) => {
        Modal.confirm({
            title: '提示', content: '是否删除数据？', onOk: async () => {
                const { code } = await apiUserDelete([row.id])
                if (code != 200) {
                    return Promise.reject()
                }
                message.success('删除成功！')
                onPagination()

            }
        })


    }
    const columns = [
        {
            align: 'center',
            title: '头像',
            dataIndex: 'avatar',
            fixed: 'left',
            render: (_, row, index) => _ && <img src={_} style={{ width: '30px' }} />,
        },
        {
            align: 'center',
            title: '用户名',
            dataIndex: 'username',
        },
        {
            align: 'center',
            title: '昵称',
            dataIndex: 'nickname',
        },
        {
            align: 'center',
            title: '用户类型',
            dataIndex: 'user_type',
            render: (_, row, index) => _ && <Tag color={_ == 100 ? 'processing' : 'success'} >
                {_ == 100 ? '系统用户' : '个人用户'}
            </Tag>,
        },
        {
            align: 'center',
            title: '手机',
            dataIndex: 'phone',
        },
        {
            align: 'center',
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            align: 'center',
            title: '状态',
            dataIndex: 'status',
            render: (row) => <Tag color={row == 1 ? 'processing' : 'default'} >
                {row == 1 ? '启用' : '禁用'}
            </Tag>,
        },
        {
            width: 400,
            align: 'center',
            title: '操作',
            render: (row, record) => {
                return (<>
                    <Button type="link" size='small' icon={<EditOutlined />} onClick={() => hanlderEdit(row)} >编辑</Button>
                    <Button type="link" size='small' icon={<DeleteOutlined />} onClick={() => hanlderDel(row)}  >删除</Button>
                    <Button type="link" size='small' icon={<UserOutlined />} >赋予角色</Button>
                    <Button type="link" size='small' icon={<UsergroupDeleteOutlined />} >初始密码</Button>
                </>
                )
            }
        },
    ]
    const rowSelection = {
        align: 'center',
        type: 'checkbox',
        fixed: true,
        onChange: (selectedRowKeys, selectedRows, info) => {

        }
    }
    const pagination = {
        current: page,
        pageSize: page_size,
        total: total,
        showTotal: () => `total: ${total}`,
        showQuickJumper: true,
        showSizeChanger: true,
        defaultPageSize: 10,
        onChange: (page, page_size) => onPagination({ page, page_size })
    }
    return (
        <>
            <section> <Button type='primary' onClick={showUserModal} >新增</Button> </section>
            <Table loading={loading}
                // scroll={{ y: 979 }}
                rowKey={(record) => record.id}
                pagination={pagination}
                rowSelection={rowSelection}
                dataSource={tableData}
                columns={columns} />
            <UserModal ref={userRef} onFresch={() => onPagination({})} />
        </>


    )

}