import { addDonerFn } from '@/services/doners/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddDoner = () => {

    const { mutate: addDoner, isPending } = useMutation({
        mutationKey: ['addDoner'],
        mutationFn: (data) => addDonerFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة المتبرع بنجاح')
        }
    })

    return {
        addDoner,
        isPending,
    }
}

export default useAddDoner