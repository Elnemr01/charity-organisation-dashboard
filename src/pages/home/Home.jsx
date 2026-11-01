import Layout from '@/appComponents/layout/Layout'
import { assets } from '@/assets/assets'
import React from 'react'

const Home = () => {
    
    return (
        <Layout headerText="الصفحة الرئيسية">
            <div className="home container py-10 rounded-md mx-auto text-center bg-white text-2xl my-8 flex items-center justify-center flex-col gap-4 p-4">
                <div className="image">
                    <img src={assets.zadLogo} alt="zad logo" loading='lazy' className='w-100'/>
                </div>
                <p className='max-w-[50%]'>
                    مرحبا بكم في الصفحة الرئيسية لموقعنا. هنا ستجدون جميع المعلومات والموارد التي تحتاجونها للتنقل في الموقع والاستفادة من خدماتنا. نتمنى لكم تجربة ممتعة ومفيدة!
                </p>
            </div>
        </Layout>
    )
}

export default Home