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
  ),
  paymentMethod: yup.string(),
  cashAmount: yup.number(),
  cashDonationPurposeId: yup.number(),
  cashInventoryType: yup.string(),
});