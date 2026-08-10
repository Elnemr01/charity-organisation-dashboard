import { loginValidation } from '@/constants/schema';
import useLogin from '@/hooks/auth/useLogin';
import { Formik, useFormik } from 'formik'
import { Eye, LockIcon, Mail } from 'lucide-react';
import React, { useState } from 'react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {login , isPending}=useLogin();

    const formik= useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidation,
        onSubmit: (values)=> {
            console.log(values);
            login(values);
        }
    })
    return (
        <section className='w-full h-screen flex justify-center items-center bg-tertiary'>
            <div>
                <form onSubmit={formik.handleSubmit} className="login-form shadow-sm flex flex-col gap-4 p-6 max-w-110
                mx-4 rounded-md bg-white">
                    <div className="logo w-20 flex items-center justify-center mx-auto">
                        <img src="./zad-logo.jpeg" alt="zad logo" loading='lazy'/>
                    </div>
                    <h1 className="text-center text-2xl font-bold text-neutral">
                        تسجيل الدخول الى لوحه تحكم جمعيه زاد الأخره
                    </h1>
                    <p className="text-center text-neutral">
                        أدخل بياناتك للوصول إلى حسابك
                    </p>
                    <div className="form-group flex flex-col gap-2 relative">
                        <label htmlFor="email" className='text-sm'>البريد الالكترونى</label>
                        <div className='relative w-full'>
                            <Mail size={15} className='absolute start-2 bottom-3 text-gray-500'/>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='zad@gmail.com'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`p-2 ps-8 rounded-md outline-none border shadow-sm w-full`}
                            />
                        </div>
                        {
                            formik.touched.email && formik.errors.email && (
                                <span className='text-sm text-red-500'>{formik.errors.email}</span>
                            )
                        }
                    </div>
                    <div className="form-group flex flex-col gap-2 relative">
                        <label htmlFor="password"  className='text-sm'>كلمه المرور</label>
                        <div className='relative w-full'>
                            <LockIcon size={15} className='absolute start-2 bottom-3 text-gray-500'/>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder='.........'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`p-2 ps-8 rounded-md outline-none border shadow-sm w-full`}
                            />
                            <Eye size={17} onClick={()=> setShowPassword(old=> !old)}
                            className='cursor-pointer text-gray-500 absolute end-2 bottom-3'/>
                        </div>
                        {
                            formik.touched.password && formik.errors.password && (
                                <span className='text-sm text-red-500'>{formik.errors.password}</span>
                            )
                        }
                    </div>
                    <button type="submit" className='bg-primary text-lg text-secondary font-semibold p-2 rounded-md hover:bg-primary/80 transition-all duration-300 mt-6 
                    cursor-pointer disabled:cursor-not-allowed disabled:bg-primary/50' disabled={isPending}>
                        {isPending ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                    </button>
                </form>
                <p className='text-sm font-light text-center mt-8 text-neutral'>
                    نظام إدارة الجمعيات الخيرية © 2026 زاد الاخره
                </p>
            </div>
        </section>
    )
}

export default Login