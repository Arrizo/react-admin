import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>字典编辑页面</div>
            <div>字典ID: {id}</div>
        </>
    )
}

