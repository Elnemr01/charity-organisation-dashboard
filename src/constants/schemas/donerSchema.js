import * as yup from 'yup';

export const donerSchema = yup.object().shape({
  name: yup.string().required('الاسم مطلوب'),
  phone: yup.string().notRequired().matches(/^[0-9]{11}$/, 'رقم الهاتف يجب أن يكون 11 رقم'),
  isSubscriber: yup.boolean().required('حالة الاشتراك مطلوبة'),
  subscriptionAmount: yup.number().when('isSubscriber', {
    is: true,
    then: (schema) => schema.required('مبلغ الاشتراك مطلوب').positive('مبلغ الاشتراك يجب أن يكون أكبر من صفر').min(0.01, 'مبلغ الاشتراك يجب أن يكون أكبر من صفر'),
    otherwise: (schema) => schema.notRequired().default(0),
  }),
});