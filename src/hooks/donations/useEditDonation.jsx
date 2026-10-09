import { editDonationFn } from '@/services/donations/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useEditDonation = () => {

    const { mutate: editDonation, isPending } = useMutation({
        mutationKey: ['editDonation'],
        mutationFn: (data) => editDonationFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تعديل التبرع بنجاح')
        }
    })

    return {
        editDonation,
        isPending,
    }
}

export default useEditDonation