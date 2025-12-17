import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>菜单编辑页面</div>
            <div>菜单ID: {id}</div>
        </>
    )
}

