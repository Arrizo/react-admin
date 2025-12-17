import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { DictionaryClassReq } from './types'
import { apiDictionaryList } from '@/api/dataCenter'
import { useRequest } from '@/hooks/useRequest'

export default function dictionary() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiDictionaryList, new DictionaryClassReq())
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