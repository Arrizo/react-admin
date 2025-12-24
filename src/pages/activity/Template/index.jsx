import KbpPanel from '@/components/BasePanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { ActivityTemplateClassReq } from './types'
import { apiActivityTemplateList } from '@/api/activity'
import { useRequest } from '@/hooks/useRequest'

export default function Template() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiActivityTemplateList, new ActivityTemplateClassReq())
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