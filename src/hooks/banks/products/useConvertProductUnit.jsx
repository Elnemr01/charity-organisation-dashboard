import { convertProductItemsFn } from '@/services/banks/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useConvertProductUnit = () => {
    
    const {mutate: convertProductUnit, isPending} = useMutation({
        mutationKey: ['convertProductUnit'],
        mutationFn: (data) => convertProductItemsFn(data),
        onError: () => {
            toast.error('حدث خطأ برجاء المحاولة لاحقا')
        },
        onSuccess: () => {
            toast.success('تم تحويل الوحدة بنجاح')
        }
    })

    return {
        convertProductUnit,
        isPending,
    }
}

export default useConvertProductUnit