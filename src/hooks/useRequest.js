import { useState, useEffect } from 'react'
export const useRequest = (apiFun, requestParams, arg = { immediate: true }) => {
    const [loading, setLoading] = useState(false)
    const [sourceData, setSourceData] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(requestParams.page)
    const [pageSize, setPageSize] = useState(requestParams.page_size)
    async function commonRequest(innerParams) {
        try {
            const params = innerParams || requestParams
            setLoading(true)
            const res = await apiFun?.(params, arg)
            if (res.code != 200) throw new Error()
            setLoading(false)
            setPage(params.page)
            setPageSize(params.page_size)
            setTotal(res?.data?.total ?? 0)
            setSourceData(res?.data?.list ?? [])
            console.log(page, '111111111', pageSize)
            return res
        } catch (error) {
            setLoading(false)
            return Promise.reject()
        }
    }

    async function onSearch(searchParams) {
        Object.assign(requestParams, searchParams)
        commonRequest()
    }
    useEffect(() => {
        // 立即执行
        if (arg?.immediate) {
            commonRequest()
        }
    }, [])
    return {
        commonRequest,
        onSearch,
        loading,
        sourceData,
        total,
        page,
        pageSize
    }
}