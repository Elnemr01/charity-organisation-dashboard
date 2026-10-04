import { useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import Loading from '../models/Loading'
import { Pen, Trash2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import DeleteModel from '@/components/customUI/DeleteModel'
import Pagination from '../pagination/Pagination'
import Empty from '../models/Empty'
import Error from '../models/Error'
import useAddNewCaseCategory from '@/hooks/categories/case/useAddNewCaseCategory'
import useUpdateCaseCategory from '@/hooks/categories/case/useUpdateCaseCategory'
import useDeleteCaseCategory from '@/hooks/categories/case/useDeleteCaseCategory'
import useGetAllCaseCategories from '@/hooks/categories/case/useGetAllCaseCategories'


const CaseCat = () => {

  const [page,setPage]=useState(1);
  const [editData,setEditData]=useState({});
  const [edit,setEdit]=useState(false);
  const {caseCategories,isLoading,isError} = useGetAllCaseCategories({page})
  const {addNewCaseCategory,isPending : addPending} = useAddNewCaseCategory();
  const {updateCaseCategory,isPending : editPending} = useUpdateCaseCategory();
  const {deleteCaseCategory,isPending : deletePending} = useDeleteCaseCategory();

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
        updateCaseCategory({id: editData.id,data: {name: values.name}},{
          onSuccess: ()=> {
            resetData();
            queryClient.invalidateQueries({queryKey: ['caseCategories']})
          }
        })
      } else {
        addNewCaseCategory(values,{
          onSuccess: ()=> {
            resetData();
            queryClient.invalidateQueries({queryKey: ['caseCategories']})
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
    <div>CaseCat</div>
  )
}

export default CaseCat