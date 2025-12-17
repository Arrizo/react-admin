import { Table, Tag, Button, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, UserOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import UserModal from './UserModal'
import { apiUserDelete } from '@/api/user/index'
import { useRef } from 'react'
import KbpPagination from '@/components/KbpPagination/index'
import { useTable } from '@/context/TableProvider'
import Permission from '@/components/Permission'
export default function TableList() {
    const userRef = useRef(null)
    const { loading, sourceData, onSearch } = useTable()
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
                onSearch()
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
                    <Permission pers={['config:config:add']}>
                        <Button type="link" size='small' icon={<EditOutlined />} onClick={() => hanlderEdit(row)} >编辑</Button>
                    </Permission>
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
    return (
        <>
            <section className='mb-12' >
                <Permission pers={['config:config:edit']}>
                    <Button type='primary' onClick={showUserModal} >新增</Button>
                </Permission>
            </section>
            <Table loading={loading}
                sticky
                rowKey={(record) => record.id}
                rowSelection={rowSelection}
                dataSource={sourceData}
                pagination={false}
                columns={columns} />
            <KbpPagination />
            <UserModal ref={userRef} onFresch={() => onSearch({})} />
        </>


    )

}