import { deleteFamilyFn } from '@/services/families/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteFamily = () => {

    const { mutate: deleteFamily, isPending } = useMutation({
        mutationKey: ['deleteFamily'],
        mutationFn: (id) => deleteFamilyFn(id),
        onError: (error) => {
            toast.error( error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف العائلة بنجاح')
        }
    })

    return {
        deleteFamily,
        isPending,
    }
}

export default useDeleteFamily