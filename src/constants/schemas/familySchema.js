import * as yup from 'yup';

export const caseSchema = yup.object().shape({
  nationalId: yup.string().required('الرقم القومي مطلوب'),
  name: yup.string().required('الاسم مطلوب'),
  nickName: yup.string().nullable(),
  gender: yup.number().required('النوع مطلوب').typeError('النوع مطلوب'),
  birthDate: yup.string().required('تاريخ الميلاد مطلوب').matches(/^\d{4}-\d{2}-\d{2}$/, 'تنسيق التاريخ غير صحيح (YYYY-MM-DD)'),
  maritalStatus: yup.number().required('الحالة الاجتماعية مطلوبة').typeError('الحالة الاجتماعية مطلوبة'),
  job: yup.string().nullable().required('العمل مطلوب'),
  jobIncome: yup.number().required('الدخل مطلوب').typeError('الدخل مطلوب').positive('الدخل يجب أن يكون أكبر من صفر').min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر'),
  educationStatus: yup.number().nullable().required('المستوى التعليمي مطلوب').typeError('المستوى التعليمي مطلوب'),
  healthStatus: yup.string().nullable().required('الحالة الصحية مطلوبة'),
  relationToFamily: yup.number().required('الصلة بالعائلة مطلوبة').typeError('الصلة بالعائلة مطلوبة'),
  phone: yup.string().nullable().required('رقم الهاتف مطلوب'),
  isPrimaryReceiver: yup.boolean().required('مستفيد رئيسي مطلوب').default(false),
  categoryIds: yup.array().of(yup.number()).nullable(),
});

const familtRequiredItemSchema=yup.object().shape({
  categoryId : yup.number().required('الصنف مطلوب').typeError('الصنف مطلوب'),
  unitId : yup.number().required('الوحدة مطلوبة').typeError('الوحدة مطلوبة'),
  purposeId : yup.number().required('الغرض مطلوب').typeError('الغرض مطلوب'),
  amount : yup.number().required('الكمية مطلوبة').typeError('الكمية مطلوبة').positive('الكمية يجب أن تكون أكبر من صفر').min(0.01, 'الكمية يجب أن تكون أكبر من صفر'),
})


const editfamiltRequiredItemSchema=yup.object().shape({
  productCategoryId : yup.number().required('الصنف مطلوب').typeError('الصنف مطلوب'),
  unitId : yup.number().required('الوحدة مطلوبة').typeError('الوحدة مطلوبة'),
  donationPurposeId : yup.number().required('الغرض مطلوب').typeError('الغرض مطلوب'),
  amount : yup.number().required('الكمية مطلوبة').typeError('الكمية مطلوبة').positive('الكمية يجب أن تكون أكبر من صفر').min(0.01, 'الكمية يجب أن تكون أكبر من صفر'),
})


export const editFamiltRequiredItemSchema=yup.object().shape({
  familyRequiredItems : yup.array().of(editfamiltRequiredItemSchema).nullable().transform((value) => (Array.isArray(value) && value.length === 0 ? null : value)),
})

const documentSchema=yup.object().shape({
  file : yup
    .mixed()
    .required('ملف الصوره مطلوب')
    .test('fileType', 'لازم تختار صورة', (value) =>
      value ? value.type?.startsWith('image/') : false
    ),
  name : yup.string().required('الاسم مطلوب').typeError('الاسم مطلوب'),
})


export const addNewFamilyDocument=yup.object().shape({
  documents: yup.array().of(documentSchema).nullable().transform((value) => (Array.isArray(value) && value.length === 0 ? null : value)),
})


export const familySchema = yup.object().shape({
  name: yup.string().required('اسم العائلة مطلوب'),
  primaryReceiverId: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
  region: yup.string().required('المنطقة مطلوبة'),
  address: yup.string().required('العنوان مطلوب'),
  decision: yup.string(),
  decisionReason: yup.string().nullable(),
  cashRequired: yup.number().required('المبلغ النقدي المطلوب').typeError('المبلغ النقدي مطلوب').positive('المبلغ يجب أن يكون أكبر من صفر').min(0.01, 'المبلغ يجب أن يكون أكبر من صفر'),
  categoryIds: yup.array().of(yup.number()).nullable(),
  cases: yup.array().of(caseSchema).required('يجب إضافة حالة واحدة على الأقل').min(1, 'يجب إضافة حالة واحدة على الأقل'),
  familyRequiredItems: yup.array().of(familtRequiredItemSchema).nullable().transform((value) => (Array.isArray(value) && value.length === 0 ? null : value)),
  documents: yup.array().of(documentSchema).nullable().transform((value) => (Array.isArray(value) && value.length === 0 ? null : value)),
});

export const editFamilySchema = yup.object().shape({
  name: yup.string().required('اسم العائلة مطلوب'),
  primaryReceiverId: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
  region: yup.string().required('المنطقة مطلوبة'),
  address: yup.string().required('العنوان مطلوب'),
  decision: yup.string(),
  decisionReason: yup.string().nullable(),
  cashRequired: yup.number().required('المبلغ النقدي المطلوب').typeError('المبلغ النقدي مطلوب').positive('المبلغ يجب أن يكون أكبر من صفر').min(0.01, 'المبلغ يجب أن يكون أكبر من صفر'),
  categoryIds: yup.array().of(yup.number()).nullable(),
});



export const caseValidation = yup.object().shape({
  nationalId: yup.string().required('الرقم القومي مطلوب'),
  name: yup.string().required('الاسم مطلوب'),
  nickName: yup.string().nullable(),
  gender: yup.string().required('النوع مطلوب').typeError('النوع مطلوب'),
  birthDate: yup.string().required('تاريخ الميلاد مطلوب').matches(/^\d{4}-\d{2}-\d{2}$/, 'تنسيق التاريخ غير صحيح (YYYY-MM-DD)'),
  maritalStatus: yup.string().required('الحالة الاجتماعية مطلوبة').typeError('الحالة الاجتماعية مطلوبة'),
  job: yup.string().nullable().required('العمل مطلوب'),
  jobIncome: yup.number().required('الدخل مطلوب').typeError('الدخل مطلوب').positive('الدخل يجب أن يكون أكبر من صفر').min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر'),
  educationStatus: yup.string().nullable().required('المستوى التعليمي مطلوب').typeError('المستوى التعليمي مطلوب'),
  healthStatus: yup.string().nullable().required('الحالة الصحية مطلوبة'),
  relationToFamily: yup.string().required('الصلة بالعائلة مطلوبة').typeError('الصلة بالعائلة مطلوبة'),
  phone: yup.string().nullable().required('رقم الهاتف مطلوب'),
  categoryIds: yup.array().of(yup.number()).nullable(),
});