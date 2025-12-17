import KbpPanel from '@/components/KbpPanel'
import Search from './components/Search'
import TableList from './components/TableList'
import { apiUserList } from '@/api/user/index'
import { UserReqClass } from './types'
import { useRequest } from '@/hooks/useRequest'
import { TableProvider } from '@/context/TableProvider'
export default function user() {
    // 其实可以直接这样简写：
    const props = useRequest(apiUserList, new UserReqClass())
    return (
        <TableProvider {...props}>
            <KbpPanel>
                <KbpPanel.Search>
                    <Search />
                </KbpPanel.Search>
                <KbpPanel.Table>
                    <TableList />
                </KbpPanel.Table>
            </KbpPanel>
        </TableProvider>
    )
}
