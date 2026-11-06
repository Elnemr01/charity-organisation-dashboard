import { editSocialAssessmentFn } from '@/services/socialAssessment/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditSocialAssessment = () => {

    const { mutate: editSocialAssessment, isPending } = useMutation({
        mutationKey: ['editSocialAssessment'],
        mutationFn: (data) => editSocialAssessmentFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.detail || error?.response?.data?.errors[0]?.description || 'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل التقييم الاجتماعي بنجاح')
        }
    })

    return {
        editSocialAssessment,
        isPending,
    }
}

export default useEditSocialAssessment