import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { AttachmentClassReq } from './types'
import { apiAttachmentList } from '@/api/dataCenter'
import { useRequest } from '@/hooks/useRequest'

export default function attachment() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiAttachmentList, new AttachmentClassReq())
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