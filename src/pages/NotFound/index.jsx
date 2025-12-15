import { useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
export default function NotFound() {
    const navigator = useNavigate()
    return (
        <Result status={404} title='404' subTitle="抱歉，您访问的页面不存在。" extra={
            <Button type='primary' onClick={() => navigator('/')} >返回首页</Button>
        } ></Result>
    )
}