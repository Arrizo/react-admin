import { Table, Button, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function TableList({ onPagination, tableData = [], total, loading, page_size, page }) {
    const navigate = useNavigate()
    const goToAdd = () => {
        navigate('/config/template/add')
    }

    const goToEdit = (record) => {
        navigate(`/config/template/edit/${record.template_id}`)
    }
    const handleDelete = async (record) => {
        // TODO: 实现删除功能
        console.log('删除', record)
    }

    const columns = [
        {
            align: 'center',
            title: '模板Id',
            dataIndex: 'template_id',
        },
        {
            align: 'center',
            title: '模板名称',
            dataIndex: 'title',
        },
        {
            align: 'center',
            title: '发布配置至服务类型',
            dataIndex: 'ds_type',
        },
        {
            align: 'center',
            title: '描述',
            dataIndex: 'description',
        },
        {
            align: 'center',
            title: '排序值',
            dataIndex: 'sort',
        },
        {
            align: 'center',
            title: '操作人',
            dataIndex: 'updated_by',
        },
        {
            align: 'updated_at',
            title: '更新时间',
            dataIndex: 'updated_by',
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
                sticky
                loading={loading}
                rowKey={(record) => record.template_id}
                pagination={pagination}
                rowSelection={rowSelection}
                dataSource={tableData}
                columns={columns}
            />
        </>
    )
}

