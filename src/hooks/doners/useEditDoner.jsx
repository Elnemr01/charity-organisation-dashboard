import { editDonerFn } from '@/services/doners/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditDoner = () => {

    const { mutate: editDoner, isPending } = useMutation({
        mutationKey: ['editDoner'],
        mutationFn: (data) => editDonerFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
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