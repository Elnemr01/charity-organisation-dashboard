import Layout from '@/appComponents/layout/Layout'
import React from 'react'
import { useLocation } from 'react-router';

const DocumentPic = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    console.log(baseUrl)
    const {state} = useLocation();
    const {document}=state;
    return (
        <Layout headerText={'اداره العائلات'}>
            <div className="container my-10 ">
                <h2 className='text-lg font-bold text-neutral my-4'>{document?.name || 'اسم المستند'}</h2>
                <img src={`${baseUrl}/${document?.storedPath}`} alt="الصورة" loading='lazy' />
            </div>
        </Layout>
    )
}

export default DocumentPic