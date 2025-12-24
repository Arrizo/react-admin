import { Pagination } from 'antd'
import styles from './index.module.less'
import { useTable } from '@/context/TableProvider'
export default function KbpPagination() {
    const { page, page_size, total, onSearch } = useTable()
    return (
        <section className={styles['pagination-container']} >
            <Pagination
                showTotal={() => `total: ${total}`}
                current={page}
                pageSize={page_size}
                total={total}
                showQuickJumper
                showSizeChanger
                onChange={(page, page_size) => onSearch({ page, page_size })}
                align='end' ></Pagination>
        </section>
    )

}