import useGetAllAidCategories from '@/hooks/categories/aid/useGetAllAidCategories'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../models/Loading'
import { Pen, Trash2 } from 'lucide-react'
import useAddNewAidCategory from '@/hooks/categories/aid/useAddNewAidCategory'
import useUpdateAidCategory from '@/hooks/categories/aid/useUpdateAidCategory'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useDeleteAidCategory from '@/hooks/categories/aid/useDeleteAidCategory'
import DeleteModel from '@/components/customUI/DeleteModel'
import Pagination from '../pagination/Pagination'
import Empty from '../models/Empty'
import Error from '../models/Error'

const AidCat = () => {
  
  const [page,setPage]=useState(1);
  const [editData,setEditData]=useState({});
  const [edit,setEdit]=useState(false);
  const {aidCategories,isLoading,isError} = useGetAllAidCategories({page})
  const {addNewAidCategory,isPending : addPending} = useAddNewAidCategory();
  const {updateAidCategory,isPending : editPending} = useUpdateAidCategory();
  const {deleteAidCategory,isPending : deletePending} = useDeleteAidCategory();


  const queryClient = useQueryClient();
  const formik=useFormik({
    initialValues:{
      name: ''
    },
    onSubmit: (values) => {
      if(values.name.trim()==='') {
        toast.error('هذا الحقل مطلوب');
        return;
      }
      if(edit) {
        updateAidCategory({id: editData.id,data: {name: values.name}},{
          onSuccess: ()=> {
            resetData();
            queryClient.invalidateQueries({queryKey: ['aidCategories']})
          }
        })
      } else {
        addNewAidCategory(values,{
          onSuccess: ()=> {
            resetData();
            queryClient.invalidateQueries({queryKey: ['aidCategories']})
          }
        });
      }
      
    }
  })


  const resetData = useCallback(()=> {
    setEdit(()=> false)
    setEditData({})
    formik.resetForm()
  },[edit])

  return (
    <div className='aid-category'>
      <h3 className='font-semibold text-lg'>التصنيفات الموجوده حاليا : </h3>
        <div className="bg-white p-4 rounded-md shadow-md mt-2">
          {
            isLoading ?
          <div className='flex justify-center items-center h-50'>
              < Loading />
          </div>
          :
          isError ?
            <Error/>
          :
          aidCategories?.items.length === 0 ?
            <Empty/>
          :
            <div className="aid-items flex flex-wrap gap-4">
            {
                aidCategories?.items.map((item)=> (
                <div key={item.id} className="catogery flex items-center justify-between rounded-full border w-fit
                gap-8 px-2 py-1 border-neutral">
                    
                    <p className=''>{item.name}</p>
                    <div className="btns flex items-center justify-between gap-2">
                    <DeleteModel
                    deleteFun={()=> deleteAidCategory(item.id,{
                        onSuccess: ()=> {
                        queryClient.invalidateQueries({queryKey: ['aidCategories']})
                        }
                    })}
                        wait={deletePending}
                        message="هل أنت متأكد من حذف هذا العنصر">
                        <Trash2 size={17} className='text-red-500 cursor-pointer'/>
                    </DeleteModel>
                    <Pen size={17} className='text-neutral cursor-pointer'
                    onClick={()=> {
                        setEdit(old=> true)
                        setEditData(item)
                        formik.setFieldValue('name', item.name)
                    }}/>
                    </div>
                </div>
                ))
                }
            </div>
          }
          <Pagination response={aidCategories} setPage={setPage}/>
        </div>
        <div className="add-new mt-4">
          <h3 className='font-semibold text-lg'>إضافة تصنيف جديد : </h3>
          <form className='mt-4 flex gap-4' onSubmit={formik.handleSubmit}>
            <div className="input flex-1">
            <input type="text" onChange={formik.handleChange} name='name' value={formik.values.name}
              placeholder='أدخل التصنيف الجديد' className='border border-gray-300 rounded-md p-2 w-full' />
            </div>
            {
              edit ? 
              <>
                <button type='submit' className='bg-primary text-white rounded-md p-2 cursor-pointer h-fit'>
                  {editPending ? 'جاري التعديل...' : 'تعديل'}
                </button>
                  <button type='button'
                  onClick={()=> {
                    resetData()
                  }}
                  className='bg-neutral text-white rounded-md p-2 cursor-pointer h-fit'>
                  الغاء
                </button>
              </>
              :
              <button type='submit' className='bg-primary text-white rounded-md p-2 cursor-pointer h-fit'>
                {addPending ? 'جاري الإضافة...' : 'إضافة'}
              </button>
            }
          </form>
        </div>

      </div>
  ) 
}

export default AidCat