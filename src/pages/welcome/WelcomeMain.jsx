
import { useAuth } from '@/utils/AuthProvider'
import { Spin } from 'antd'
export default function WelcomeMain() {
    const { loading, setLoading } = useAuth()
    return (<>
        <div onClick={() => setLoading(!loading)} >loasdfad</div>
        {loading && <Spin size="large" />}

    </>

    )
}