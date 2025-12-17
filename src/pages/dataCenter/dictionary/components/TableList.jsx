import { Table, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function TableList({ onPagination, tableData = [], total, loading, page_size, page }) {
    const navigate = useNavigate()
    const goToAdd = () => {
        navigate('/dataCenter/dictionary/add')
    }

    const goToEdit = (record) => {
        navigate(`/dataCenter/dictionary/edit/${record.id}`)
    }
    const handleDelete = async (record) => {
        // TODO: 实现删除功能
        console.log('删除', record)
    }

    const columns = [
        {
            align: 'center',
            title: '字典Id',
            dataIndex: 'id',
        },
        {
            align: 'center',
            title: '字典名称',
            dataIndex: 'name',
        },
        {
            align: 'center',
            title: '字典编码',
            dataIndex: 'code',
        },
        {
            align: 'center',
            title: '描述',
            dataIndex: 'description',
        },
        {
            align: 'center',
            title: '操作人',
            dataIndex: 'updated_by',
        },
        {
            align: 'center',
            title: '更新时间',
            dataIndex: 'updated_at',
        },
        {
            align: 'center',
            title: '操作',
            render: (_, record) => {
                return (
                    <>
                        <Button
                            type="link"
                            size='small'
                            icon={<EditOutlined />}
                            onClick={() => goToEdit(record)}
                        >
                            编辑
                        </Button>
                        <Button
                            type="link"
                            size='small'
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record)}
                        >
                            删除
                        </Button>
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
            // TODO: 处理批量选择
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
            <section style={{ marginBottom: '10px' }}>
                <Button type='primary' onClick={goToAdd}>新增</Button>
            </section>

            <Table
                loading={loading}
                rowKey={(record) => record.id}
                pagination={pagination}
                rowSelection={rowSelection}
                dataSource={tableData}
                columns={columns}
            />
        </>
    )
}

