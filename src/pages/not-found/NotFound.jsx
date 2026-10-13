import Layout from '@/appComponents/layout/Layout'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import React from 'react'

const NotFound = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    return (
        <Layout headerText="الصفحة غير موجودة">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-md">
                    عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
                </p>
                <Button variant="secondary" onClick={goHome}>
                    العودة للرئيسية
                </Button>
            </div>
        </Layout>
    )
}

export default NotFound