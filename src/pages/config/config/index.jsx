import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { ConfigClassReq } from './types'
import { apiConfigList } from '@/api/config/index'
import { apiTemplateRemote } from '@/api/template'
import { useRequest } from '@/hooks/useRequest'
import { useState, useEffect } from 'react'
export default function config() {
    const { loading, sourceData, total, page, pageSize, onSearch } = useRequest(apiConfigList, new ConfigClassReq())
    const [tempalteList, setTempalteList] = useState([])

    const getTemplateRemote = async () => {
        const { data, code } = await apiTemplateRemote(["template_id", "title", "gameType"])
        if (code == 200) {
            setTempalteList(data)
        }
    }
    useEffect(() => {
        getTemplateRemote()
    }, [])
    return (
        <KbpPanel>
            <KbpPanel.Search>
                <Search onSearch={onSearch} tempalteList={tempalteList} ></Search>
            </KbpPanel.Search>
            <KbpPanel.Table>
                <TableList
                    onPagination={onSearch}
                    loading={loading}
                    tableData={sourceData}
                    total={total}
                    page={page}
                    page_size={pageSize}
                    tempalteList={tempalteList}
                ></TableList>
            </KbpPanel.Table>
        </KbpPanel>
    )
}