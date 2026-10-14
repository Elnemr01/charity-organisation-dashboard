import { addFamilyFn } from '@/services/families/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddFamily = () => {

    const { mutate: addFamily, isPending } = useMutation({
        mutationKey: ['addFamily'],
        mutationFn: (data) => addFamilyFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة العائلة بنجاح')
        }
    })

    return {
        addFamily,
        isPending,
    }
}

export default useAddFamily