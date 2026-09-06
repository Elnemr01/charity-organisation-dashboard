import { useAuth } from '@/contextAPI/UserProvider';
import { loginFn } from '@/services/auth/services';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const {mutate: login, isPending, error} = useMutation({
        mutationKey: ['login'],
        mutationFn: (data)=> loginFn(data),

        onSuccess: (res)=> {
            setUser(res.data);
            localStorage.setItem('zadUser', JSON.stringify(res?.data));
            toast.success('تم تسجيل الدخول بنجاح');
            navigate('/');
        },
        onError: (error)=> {
            console.log(error);
            toast.error(error.response.data.message || 'حدث خطأ ما، يرجى المحاولة لاحقاً');
            
        }
    })


    return {
        login,
        isPending,
        error
    }
}

export default useLogin