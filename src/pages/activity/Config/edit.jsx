import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>活动配置编辑页面</div>
            <div>配置ID: {id}</div>
        </>
    )
}

