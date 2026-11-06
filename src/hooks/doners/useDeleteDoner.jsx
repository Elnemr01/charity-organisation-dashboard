import { deleteDonerFn } from '@/services/doners/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteDoner = () => {

    const { mutate: deleteDoner, isPending } = useMutation({
        mutationKey: ['deleteDoner'],
        mutationFn: (id) => deleteDonerFn(id),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف المتبرع بنجاح')
        }
    })

    return {
        deleteDoner,
        isPending,
    }
}

export default useDeleteDoner