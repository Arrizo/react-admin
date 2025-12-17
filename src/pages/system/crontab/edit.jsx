import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>定时任务编辑页面</div>
            <div>任务ID: {id}</div>
        </>
    )
}

