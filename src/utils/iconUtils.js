import * as Icons from '@ant-design/icons'
import React, { Suspense } from 'react'


export default function Iconfont(props) {
    const { name } = props
    const CompIcons = Icons[name]
    return (
        React.createElement(CompIcons)
        // <Suspense fallback={<div>loading....</div>} >
        //     <CompIcons />
        // </Suspense>
    )
}