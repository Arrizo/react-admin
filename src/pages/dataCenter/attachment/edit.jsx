import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>附件编辑页面</div>
            <div>附件ID: {id}</div>
        </>
    )
}

