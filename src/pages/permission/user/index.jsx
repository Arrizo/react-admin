import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { apiUserList } from '@/api/user/index'
import { UserReqClass } from './typs'
import { useRequest } from '@/hooks/useRequest'
export default function user() {
    const { loading, sourceData, total, onSearch, page, pageSize } = useRequest(apiUserList, new UserReqClass())
    return (
        <KbpPanel>
            <KbpPanel.Search>
                <Search onSearch={onSearch} loading={loading} />
            </KbpPanel.Search>
            <KbpPanel.Table>
                <TableList
                    onPagination={onSearch}
                    loading={loading}
                    tableData={sourceData}
                    total={total}
                    page={page}
                    page_size={pageSize}
                />
            </KbpPanel.Table>
        </KbpPanel>

    )
}
