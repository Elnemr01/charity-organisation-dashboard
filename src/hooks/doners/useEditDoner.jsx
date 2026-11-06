import { editDonerFn } from '@/services/doners/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditDoner = () => {

    const { mutate: editDoner, isPending } = useMutation({
        mutationKey: ['editDoner'],
        mutationFn: (data) => editDonerFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل المتبرع بنجاح')
        }
    })

    return {
        editDoner,
        isPending,
    }
}

export default useEditDoner