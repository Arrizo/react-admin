import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { CrontabClassReq } from './types'
import { apiCrontabList } from '@/api/system'
import { useRequest } from '@/hooks/useRequest'

export default function Crontab() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiCrontabList, new CrontabClassReq())
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