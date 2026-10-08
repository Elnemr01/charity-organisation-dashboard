import Layout from '@/appComponents/layout/Layout'
import React from 'react'

const Home = () => {
    return (
        <Layout headerText="الصفحة الرئيسية">
            <div className="home max-w-[50%] mx-auto text-center bg-white text-2xl my-8">
                <p>
                    مرحبا بكم في الصفحة الرئيسية لموقعنا. هنا ستجدون جميع المعلومات والموارد التي تحتاجونها للتنقل في الموقع والاستفادة من خدماتنا. نتمنى لكم تجربة ممتعة ومفيدة!
                </p>
            </div>
        </Layout>
    )
}

export default Home