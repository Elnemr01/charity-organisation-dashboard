import { editCaseFn } from '@/services/cases/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditCase = () => {

    const { mutate: editCase, isPending } = useMutation({
        mutationKey: ['editCase'],
        mutationFn: (data) => editCaseFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل الحاله بنجاح')
        }
    })

    return {
        editCase,
        isPending,
    }
}

export default useEditCase