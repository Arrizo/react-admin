import KbpPanel from '@/components/BasePanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { ConfigClassReq } from './types'
import { apiConfigList } from '@/api/config/index'
import { apiTemplateRemote } from '@/api/template'
import { useRequest } from '@/hooks/useRequest'
import { useState, useEffect } from 'react'
import { TableProvider } from '@/context/TableProvider'
export default function config() {
    const props = useRequest(apiConfigList, new ConfigClassReq())
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
        <TableProvider {...props}>
            <KbpPanel>
                <KbpPanel.Search>
                    <Search tempalteList={tempalteList} ></Search>
                </KbpPanel.Search>
                <KbpPanel.Table>
                    <TableList tempalteList={tempalteList} ></TableList>
                </KbpPanel.Table>
            </KbpPanel>
        </TableProvider>

    )
}