import { useAuth } from '@/contextAPI/UserProvider';
import { loginFn, logoutFn } from '@/services/auth/services';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const {mutate: logout, isPending, error} = useMutation({
        mutationKey: ['logout'],
        mutationFn: ()=> logoutFn(),

        onSuccess: (res)=> {
            localStorage.removeItem('zadUser');
            toast.success('تم تسجيل الخروج بنجاح');
            navigate('/login');
        },
        onError: (error)=> {
            toast.error(error.response.data.detail || 'حدث خطأ ما، يرجى المحاولة لاحقاً');
            
        }
    })


    return {
        logout,
        isPending,
        error
    }
}

export default useLogout