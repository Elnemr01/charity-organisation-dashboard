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

export const transferValidation = Yup.object({
    sourceInventoryType: Yup.string().required('نوع الخزنه المصدر مطلوب'),
    sourcePurposeId: Yup.number().required('غرض التبرع للمصدر مطلوب').typeError('غرض التبرع للمصدر مطلوب'),
    targetInventoryType: Yup.string().required('نوع الخزنه الهدف مطلوب'),
    targetPurposeId: Yup.number().required('غرض التبرع للهدف مطلوب').typeError('غرض التبرع للهدف مطلوب'),
    amount: Yup.number()
        .required('المبلغ مطلوب')
        .typeError('المبلغ مطلوب')
        .positive('المبلغ يجب ان يكون أكبر من صفر')
        .min(1, 'المبلغ يجب ان يكون أكبر من صفر')
})

export const convertUnitValidation = Yup.object({
    targetUnitId: Yup.string()
        .required('الوحدة الهدف مطلوبة')
        .typeError('الوحدة الهدف مطلوبة'),
    sourceAmount: Yup.string()
        .required('الكميه المصدر مطلوبه')
        .typeError('الكميه المصدر مطلوبه')
        .min(0.01, 'الكميه يجب ان تكون أكبر من صفر'),
    targetAmount: Yup.string()
        .required('الكميه الهدف مطلوبه')
        .typeError('الكميه الهدف مطلوبه')
        .min(0.01, 'الكميه يجب ان تكون أكبر من صفر')
})