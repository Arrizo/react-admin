import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>用户编辑页面</div>
            <div>用户ID: {id}</div>
        </>
    )
}

