import { deleteDonationFn } from '@/services/donations/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useDeleteDonation = () => {

    const { mutate: deleteDonation, isPending } = useMutation({
        mutationKey: ['deleteDonation'],
        mutationFn: (id) => deleteDonationFn(id),
        onError: (error) => {
            toast.error( error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم حذف التبرع بنجاح')
        }
    })

    return {
        deleteDonation,
        isPending,
    }
}

export default useDeleteDonation