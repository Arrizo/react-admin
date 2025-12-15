import { Spin } from 'antd'
import styls from './index.module.less'
export default function GlobalLoading() {
    return (
        <section className={styls.containerloading} >
            <Spin />
        </section>
    )
}