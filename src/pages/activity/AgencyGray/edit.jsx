import { useParams } from 'react-router-dom'

export default function edit() {
    const { id } = useParams()
    return (
        <>
            <div>运营商灰度编辑页面</div>
            <div>灰度ID: {id}</div>
        </>
    )
}

