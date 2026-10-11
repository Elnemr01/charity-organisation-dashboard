import { addDonationFn } from '@/services/donations/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useAddDonation = () => {

    const { mutate: addDonation, isPending } = useMutation({
        mutationKey: ['addDonation'],
        mutationFn: (data) => addDonationFn(data),
        onError: (error) => {
            toast.error( error?.response?.data?.detail ||'حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم إضافة التبرع بنجاح')
        }
    })

    return {
        addDonation,
        isPending,
    }
}

export default useAddDonation