import { addSocialAssessmentFn } from '@/services/socialAssessment/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddSocialAssessment = () => {

    const { mutate: addSocialAssessment, isPending } = useMutation({
        mutationKey: ['addSocialAssessment'],
        mutationFn: (data) => addSocialAssessmentFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة التقييم الاجتماعي بنجاح')
        }
    })

    return {
        addSocialAssessment,
        isPending,
    }
}

export default useAddSocialAssessment