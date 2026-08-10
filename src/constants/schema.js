import * as Yup from 'yup'


export const loginValidation= Yup.object({
    email: Yup.string().email('البريد الالكترونى غير صالح').required('البريد الالكترونى مطلوب'),
    password: Yup.string()
        .required('كلمه المرور مطلوب')
        .min(8, 'كلمه المرور خاطئه')
        .matches(/[A-Z]/, 'كلمه المرور خاطئه')
        .matches(/[0-9]/, 'كلمه المرور خاطئه')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'كلمه المرور خاطئه')
})