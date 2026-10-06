import Layout from '@/appComponents/layout/Layout'
import useGetCashInventories from '@/hooks/banks/money/useGetCashInventories'
import React from 'react'

const Money = () => {

    const {cashInvertories, isLoading, isError} = useGetCashInventories()

    return (
        <Layout headerText={'اداره الماليات'}>
            <div className="container">

            </div>
        </Layout>
    )
}

export default Money