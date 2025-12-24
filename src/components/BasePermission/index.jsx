
import { useAuthStore } from '@/store'
export default function Permission({ pers = [], children }) {
    const { hasPermission } = useAuthStore()
    return (
        hasPermission(pers) ? children : null
    )
}