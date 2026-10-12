import * as yup from 'yup';

export const familyExpenseSchema = yup.object().shape({
  name: yup.string().required('اسم المصروف مطلوب'),
  amount: yup.number().required('المبلغ مطلوب').positive('المبلغ يجب أن يكون أكبر من صفر'),
  notes: yup.string().required('الملاحظات مطلوبة'),
});