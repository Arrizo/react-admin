import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>角色编辑页面</div>
            <div>角色ID: {id}</div>
        </>
    )
}

