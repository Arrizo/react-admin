import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>系统设置编辑页面</div>
            <div>设置ID: {id}</div>
        </>
    )
}

