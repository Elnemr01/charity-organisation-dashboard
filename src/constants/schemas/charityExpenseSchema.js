import * as yup from 'yup';

export const charityExpenseSchema = yup.object().shape({
  name: yup.string().required('اسم المصروف مطلوب'),
  amount: yup.number().required('المبلغ مطلوب').positive('المبلغ يجب أن يكون أكبر من صفر'),
  notes: yup.string(),
});


export const paySchema = yup.object().shape({
        donationPurposeId: yup.string().required('الغرض مطلوب'),
        cashInventoryType: yup.string().required('نوع الخزنة مطلوب'),
        amount: yup.number().required('المبلغ مطلوب').positive('المبلغ يجب أن يكون أكبر من صفر'),
    });
