import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'

export default function add() {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { copyData } = location.state || {}
    const key = searchParams.get('key')

    return (
        <>
            <div>运营商灰度新增页面</div>
            {copyData && <div>复制数据: {JSON.stringify(copyData)}</div>}
            {key && <div>查询参数key: {key}</div>}
        </>
    )
}

