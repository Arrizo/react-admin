

import { useParams } from 'react-router-dom'
export default function edit() {
    const { id } = useParams()
    return (
        <>
            edit{id}
        </>
    )
}