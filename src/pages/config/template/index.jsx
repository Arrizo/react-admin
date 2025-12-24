import KbpPanel from '@/components/BasePanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { TemplateClassReq } from './types'
import { apiTemplateList } from '@/api/template'
import { useRequest } from '@/hooks/useRequest'

export default function template() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiTemplateList, new TemplateClassReq())
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
