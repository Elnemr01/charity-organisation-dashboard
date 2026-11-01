import { deleteDocumentFn } from '@/services/documents/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteDocument = () => {


    const { mutate: deleteDocument, isPending } = useMutation({
        mutationKey: ['deleteDocument'],
        mutationFn: (id) => deleteDocumentFn(id),
        onError: (error) => {
            toast.error( error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف المرفق بنجاح')
        }
    })

    return {
        deleteDocument,
        isPending,
    }
}

export default useDeleteDocument