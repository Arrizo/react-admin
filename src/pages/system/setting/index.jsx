import KbpPanel from '@/components/BasePanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { SettingClassReq } from './types'
import { apiSettingList } from '@/api/system'
import { useRequest } from '@/hooks/useRequest'

export default function Setting() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiSettingList, new SettingClassReq())
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