
import { useNavigate } from 'react-router-dom'
import { AuthProvider } from '@/utils/AuthProvider'
import WelcomeMain from './WelcomeMain'
export default function welcome() {
    // 
    return (
        <AuthProvider>
            <WelcomeMain></WelcomeMain>
        </AuthProvider>
    )
}