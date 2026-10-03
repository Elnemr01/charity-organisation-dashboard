import useGetAllAidCategories from '@/hooks/categories/aid/useGetAllAidCategories'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Loading from '../models/Loading'
import { Pen, Trash2 } from 'lucide-react'

const AidCat = () => {
  const [editID,setID]=useState(null);
  const [edit,setEdit]=useState(false);
  const {aidCategories,isLoading,isError,error} = useGetAllAidCategories()
  console.log(aidCategories)

  const formik=useFormik({
    initialValues:{
      name:''
    },
    validate: (values)=> {
      if(values.name.trim()==='') {
        formik.errors.name = 'هذا الحقل مطلوب';
      }
    },
    onSubmit: (values) => {
      console.log(values);
    }
  })

  return (
    <div className='aid-category'>
      <h3 className='font-semibold text-lg'>التصنيفات الموجوده حاليا : </h3>
      {isLoading ?
        <div className='flex justify-center items-center h-50'>
          <Loading />
        </div>
        :
        <div className="aid-items bg-white p-4 rounded-md shadow-md mt-2">
          <div className="catogery flex items-center justify-between rounded-full border w-fit
          gap-8 px-2 py-1 border-neutral">
            <p className=''>تصنيف 1</p>
            <div className="btns flex items-center justify-between gap-2">
              <Trash2 size={17} className='text-red-500'/>
              <Pen size={17} className='text-neutral' onClick={()=> {
                setEdit(old=> !old)
                setID(1)
              }}/>
            </div>
          </div>
        </div>
      }
      {
        !edit ? 
        <div className="add-new mt-4">
          <h3 className='font-semibold text-lg'>إضافة تصنيف جديد : </h3>
          <form className='mt-4 flex gap-4' onSubmit={formik.handleSubmit}>
            <div className="input flex-1">
            <input type="text" onChange={formik.handleChange} name='name'
            placeholder='أدخل التصنيف الجديد' className='border border-gray-300 rounded-md p-2 w-full' />
            {
              formik.errors.name && <p className='text-red-500 text-sm mt-1'>{formik.errors.name}</p>
            }
            </div>
            <button type='submit' className='bg-primary text-white rounded-md p-2 cursor-pointer h-fit'>
              {`إضافة`}
            </button>
          </form>
        </div>

      :
      <div className="edit mt-4">
          <h3 className='font-semibold text-lg'>تعديل تصنيف : </h3>
          <form className='mt-4 flex gap-4' onSubmit={formik.handleSubmit}>
            <div className="input flex-1">
            <input type="text" onChange={formik.handleChange} name='name'
            placeholder='أدخل التصنيف الجديد' className='border border-gray-300 rounded-md p-2 w-full' />
            {
              formik.errors.name && <p className='text-red-500 text-sm mt-1'>{formik.errors.name}</p>
            }
            </div>
            <div className="btns flex gap-4">
              <button type='submit' className='bg-primary text-white rounded-md p-2 cursor-pointer h-fit'>
                تعديل
              </button>
                <button type='button'
                onClick={()=> {
                  setEdit((old)=> !old)
                  setID(null)
                }}
                className='bg-neutral text-white rounded-md p-2 cursor-pointer h-fit'>
                الغاء
              </button>
            </div>
          </form>
        </div>

      }
      </div>
  ) 
}

export default AidCat