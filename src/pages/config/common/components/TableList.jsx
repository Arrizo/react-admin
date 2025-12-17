import { Table, Tag, Button, Pagination, Switch } from 'antd'
import { apiConfigStatus } from '@/api/config'
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import PusherModal from '../components/pusherModal'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
export default function TableList({ onPagination, tableData = [], total, loading, page_size, page, tempalteList }) {
    const modalRef = useRef(null)
    const navigate = useNavigate()
    const onCheckedChange = async (checked, row) => {
        const { code } = await apiConfigStatus(row.id, Number(checked))
        if (code != 200) { row.status = !checked } else {
            onPagination()
        }

    }
    const openPusher = () => {
        modalRef.current.showModal()
    }
    const goTo = () => {
        navigate('/config/common/add', { state: { asdfas: 2323 } })
    }
    const columns = [
        {
            align: 'center',
            title: '配置Id',
            dataIndex: 'id',

        },
        {
            align: 'center',
            title: '配置名称',
            dataIndex: 'title',

        },
        {
            align: 'center',
            title: '模板Id',
            dataIndex: 'template_id',

        },
        {
            align: 'center',
            title: '模板名称',
            dataIndex: 'template_name',

        },
        {
            align: 'center',
            title: '开始时间',
            dataIndex: 'startTime',

        },
        {
            align: 'center',
            title: '结束时间',
            dataIndex: 'endTime',

        },
        {
            align: 'center',
            title: '操作人',
            dataIndex: 'updated_by',

        },
        {
            align: 'center',
            title: '状态',
            dataIndex: 'status',
            render: (_, row, index) => <Switch onChange={(checked) => onCheckedChange(checked, row)} checkedChildren='开' unCheckedChildren='关' checked={!!row.status} />
        },
        {
            align: 'center',
            title: '操作时间',
            dataIndex: 'created_at',
        },
        {
            align: 'center',
            title: '操作',
            render: (row, record) => {
                return (<>
                    <Button type="link" size='small' icon={<EditOutlined />} onClick={goTo} >复制</Button>
                    <Button type="link" size='small' icon={<DeleteOutlined />} >编辑</Button>
                    <Button type="link" size='small' icon={<UserOutlined />} >删除</Button>
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
            <section style={{ marginBottom: '10px' }}>
                <Button type='primary' >新增</Button>
                <Button onClick={openPusher} >发布</Button>
            </section>

            <Table loading={loading}
                rowKey={(record) => record.id}
                pagination={pagination}
                rowSelection={rowSelection}
                dataSource={tableData}
                columns={columns} />
            <PusherModal tempalteList={tempalteList} ref={modalRef} />
        </>

    )

}