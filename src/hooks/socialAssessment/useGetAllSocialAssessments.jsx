import { getAllSocialAssessmentsFn } from '@/services/socialAssessment/services'
import { useQuery } from '@tanstack/react-query'

const useGetAllSocialAssessments = (data) => {

    const { data: socialAssessments, isLoading, isError } = useQuery({
        queryKey: ['socialAssessments', data],
        queryFn: () => getAllSocialAssessmentsFn(data),
    })

    return {
        socialAssessments,
        isLoading,
        isError
    }
}

export default useGetAllSocialAssessments