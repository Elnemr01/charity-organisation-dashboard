import * as yup from 'yup';

export const donationSchema = yup.object().shape({
  donorId: yup.number().required('اسم المتبرع مطلوب'),
  donationDeliverer: yup.string().required('مقدم التبرع مطلوب'),
  receiptNumber: yup.string().required('رقم الإيصال مطلوب'),
  notes: yup.string(),
  productItems: yup.array().of(
    yup.object().shape({
      categoryId: yup.string().required('الصنف مطلوب'),
      unitId: yup.string().required('الوحدة مطلوبة'),
      purposeId: yup.string().required('الغرض مطلوب'),
      amount: yup.string().required('الكمية مطلوبة').matches(/^\d+$/, 'الكمية يجب أن تكون رقمًا صحيحًا').test('positive', 'الكمية يجب أن تكون أكبر من صفر', (value) => parseInt(value, 10) > 0),
    })
  ).when('donationType', {
    is: 'عينى',
    then: (schema) => schema.min(1, 'يجب إضافة صنف واحد على الأقل').required('الصناعات مطلوبة للتبرع العيني'),
    otherwise: (schema) => schema.notRequired(),
  }),
  paymentMethod: yup.string().when('donationType', {
    is: 'نقدى',
    then: (schema) => schema.required('طريقة الدفع مطلوبة'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cashAmount: yup.number().when('donationType', {
    is: 'نقدى',
    then: (schema) => schema.required('المبلغ مطلوب').positive('المبلغ يجب أن يكون أكبر من صفر'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cashDonationPurposeId: yup.number().when('donationType', {
    is: 'نقدى',
    then: (schema) => schema.required('غرض التبرع النقدي مطلوب'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cashInventoryType: yup.string().when('donationType', {
    is: 'نقدى',
    then: (schema) => schema.required('نوع الخزنة مطلوب'),
    otherwise: (schema) => schema.notRequired(),
  }),
});