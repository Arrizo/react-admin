import KbpPanel from '@/components/BasePanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { AgencyGrayClassReq } from './types'
import { apiAgencyGrayList } from '@/api/activity'
import { useRequest } from '@/hooks/useRequest'

export default function AgencyGray() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiAgencyGrayList, new AgencyGrayClassReq())
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