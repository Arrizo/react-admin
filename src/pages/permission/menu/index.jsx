import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { MenuClassReq } from './types'
import { apiMenuList } from '@/api/permission'
import { useRequest } from '@/hooks/useRequest'

export default function menu() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiMenuList, new MenuClassReq())
    return (
        <KbpPanel>
            <KbpPanel.Search>
                <Search onSearch={onSearch} loading={loading}></Search>
            </KbpPanel.Search>
            <KbpPanel.Table>
                <TableList
                    onPagination={onSearch}
                    loading={loading}
                    tableData={sourceData}
                    total={total}
                    page={page}
                    page_size={pageSize}
                ></TableList>
            </KbpPanel.Table>
        </KbpPanel>
    )
}