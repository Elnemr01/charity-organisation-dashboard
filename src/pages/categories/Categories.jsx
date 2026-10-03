import AidCat from '@/appComponents/categories/AidCat'
import CaseCat from '@/appComponents/categories/CaseCat'
import DonationPurpose from '@/appComponents/categories/DonationPurpose'
import ProductCat from '@/appComponents/categories/ProductCat'
import ProductUnits from '@/appComponents/categories/ProductUnits'
import Layout from '@/appComponents/layout/Layout'
import { categories } from '@/constants/categories/categories'
import React, { useMemo, useState } from 'react'

const Categories = () => {
    const [category,setCategory] = useState("aid")

    const categoryBtns=useMemo(()=> categories,[])

    return (
        <Layout headerText="التصنيفات">
            <div className="container mt-8">
                <div className="title flex items-center gap-4">
                    <h2 className='text-2xl font-semibold'>اختر نوع التصنيفات : </h2>
                    <div className="items flex gap-4">
                        {
                            categoryBtns.map((item,index)=>(
                                <button
                                key={index}
                                className={` px-2 py-1 cursor-pointer text-white font-semibold border rounded-full w-fit ${category===item.value ? "bg-secondary" : "bg-primary"}`}
                                onClick={()=>setCategory(item.value)}>{item.name}</button>
                            ))
                        }
                    </div>
                </div>
                <div className="categories mt-8">
                    {category === "product" && <ProductCat />}
                    {category === "aid" && <AidCat />}
                    {category === "case" && <CaseCat />}
                    {category === "donation" && <DonationPurpose />}
                    {category === "units" && <ProductUnits />}
                </div>
            </div>
        </Layout>
    )
}

export default Categories