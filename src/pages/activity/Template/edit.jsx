import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>活动模板编辑页面</div>
            <div>模板ID: {id}</div>
        </>
    )
}

