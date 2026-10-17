import { deleteCaseFn } from '@/services/cases/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteCase = () => {

    const { mutate: deleteCase, isPending } = useMutation({
        mutationKey: ['deleteCase'],
        mutationFn: (id) => deleteCaseFn(id),
        onError: (error) => {
            toast.error( error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف الحاله بنجاح')
        }
    })

    return {
        deleteCase,
        isPending,
    }
}

export default useDeleteCase