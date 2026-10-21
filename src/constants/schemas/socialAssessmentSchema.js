import * as yup from 'yup';


export const socialAssessmentSchema = yup.object().shape({
    familyId: yup.number().required('معرف العائلة مطلوب').typeError('معرف العائلة مطلوب'),
    hasPension: yup.boolean().required('وجود معاش مطلوب').typeError('وجود معاش مطلوب'),
    pensionType: yup.string().required('نوع المعاش مطلوب'),
    pensionAmount: yup.number().required('مبلغ المعاش مطلوب').typeError('مبلغ المعاش مطلوب').positive('مبلغ المعاش يجب أن يكون أكبر من صفر').min(0, 'مبلغ المعاش يجب أن يكون أكبر من أو يساوي صفر'),
    hasProperties: yup.boolean().required('وجود أملاك مطلوب').typeError('وجود أملاك مطلوب'),
    propertiesDetails: yup.string().nullable(),
    hasWellOffRelatives: yup.boolean().required('وجود أقارب ميسورين مطلوب').typeError('وجود أقارب ميسورين مطلوب'),
    wellOffRelativesRelationship: yup.string().nullable(),
    canReachDonors: yup.boolean().required('القدرة على الوصول للمتبرعين مطلوبة').typeError('القدرة على الوصول للمتبرعين مطلوبة'),
    donorsAccessNotes: yup.string().nullable(),
    receivesExternalAid: yup.boolean().required('استلام مساعدات خارجية مطلوب').typeError('استلام مساعدات خارجية مطلوب'),
    externalAidDetails: yup.string().nullable(),
    housingType: yup.string().required('نوع السكن مطلوب'),
    rentAmount: yup.number().required('مبلغ الإيجار مطلوب').typeError('مبلغ الإيجار مطلوب').positive('مبلغ الإيجار يجب أن يكون أكبر من صفر').min(0, 'مبلغ الإيجار يجب أن يكون أكبر من أو يساوي صفر'),
    requiredMedicalTreatment: yup.string().required('العلاج الطبي المطلوب مطلوب'),
    medicalTreatmentCost: yup.number().required('تكلفة العلاج الطبي مطلوبة').typeError('تكلفة العلاج الطبي مطلوبة').positive('تكلفة العلاج يجب أن تكون أكبر من صفر').min(0, 'تكلفة العلاج يجب أن تكون أكبر من أو يساوي صفر'),
});

