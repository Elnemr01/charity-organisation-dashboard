import { getSocialAssessmentByIdFn } from '@/services/socialAssessment/services'
import { useQuery } from '@tanstack/react-query'

const useGetSocialAssessmentById = (data) => {

    const { data: socialAssessment, isLoading, isError } = useQuery({
        queryKey: ['socialAssessmentById', data],
        queryFn: () => getSocialAssessmentByIdFn(data),
    })

    return {
        socialAssessment,
        isLoading,
        isError
    }
}

export default useGetSocialAssessmentById