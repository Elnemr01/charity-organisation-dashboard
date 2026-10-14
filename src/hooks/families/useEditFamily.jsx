import { editFamilyFn } from '@/services/families/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditFamily = () => {

    const { mutate: editFamily, isPending } = useMutation({
        mutationKey: ['editFamily'],
        mutationFn: (data) => editFamilyFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل العائلة بنجاح')
        }
    })

    return {
        editFamily,
        isPending,
    }
}

export default useEditFamily