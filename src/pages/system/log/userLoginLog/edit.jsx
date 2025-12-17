import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>用户登录日志编辑页面</div>
            <div>日志ID: {id}</div>
        </>
    )
}

