
import { useSearchParams, useLocation } from 'react-router-dom'
export default function add() {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const { asdfas } = location.state
    const key = searchParams.get('key')
    return (
        <>
            {asdfas}
            11111
            {key}
        </>
    )
}