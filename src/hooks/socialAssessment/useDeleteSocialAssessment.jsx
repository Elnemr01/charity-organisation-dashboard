import { deleteSocialAssessmentFn } from '@/services/socialAssessment/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteSocialAssessment = () => {

    const { mutate: deleteSocialAssessment, isPending } = useMutation({
        mutationKey: ['deleteSocialAssessment'],
        mutationFn: (id) => deleteSocialAssessmentFn(id),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف التقييم الاجتماعي بنجاح')
        }
    })

    return {
        deleteSocialAssessment,
        isPending,
    }
}

export default useDeleteSocialAssessment