import { addDocumentFn } from '@/services/documents/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddDocument = () => {

    const { mutate: addDocument, isPending } = useMutation({
        mutationKey: ['addDocument'],
        mutationFn: (data) => addDocumentFn(data),
        onError: (error) => {
            toast.error( error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة المرفق بنجاح')
        }
    })

    return {
        addDocument,
        isPending,
    }
}

export default useAddDocument