    import * as yup from 'yup';

    const REQ = 'هذا الحقل مطلوب';
    const NUM = 'يجب إدخال رقم صحيح';

    // '' -> null علشان الـ number ما يديش typeError لو الحقل فاضي
    const emptyToNull = (value, original) => (original === '' ? null : value);

    const yesNo = () => yup.boolean().nullable().required(REQ);

    // حقل نصي مطلوب فقط لو الحقل الأساسي = true
    const textWhen = (flag, expected = true) =>
    yup.string().nullable().when(flag, {
        is: (v) => v === expected,
        then: (s) => s.trim().required(REQ),
        otherwise: (s) => s.nullable(),
    });

    // حقل رقمي مطلوب فقط لو الحقل الأساسي = true
    const numberWhen = (flag, expected = true) =>
    yup
        .number()
        .transform(emptyToNull)
        .typeError(NUM)
        .nullable()
        .when(flag, {
        is: (v) => v === expected,
        then: (s) => s.required(REQ).min(0, 'القيمة لا يمكن أن تكون سالبة'),
        otherwise: (s) => s.nullable(),
        });

    const requiredText = () => yup.string().trim().required(REQ);

    const phone = () =>
    yup
        .string()
        .trim()
        .required(REQ)
        .matches(/^01[0-9]{9}$/, 'رقم الهاتف غير صحيح (11 رقم يبدأ بـ 01)');

    export const socialAssessmentSchema = yup.object({
    familyId: yup.number().required(REQ),

    // ---- المعاش ----
    hasPension: yesNo(),
    pensionType: textWhen('hasPension'),
    pensionAmount: numberWhen('hasPension'),

    // ---- الممتلكات ----
    hasProperties: yesNo(),
    propertiesDetails: textWhen('hasProperties'),

    // ---- أقارب ميسورين ----
    hasWellOffRelatives: yesNo(),
    wellOffRelativesRelationship: textWhen('hasWellOffRelatives'),

    // ---- الوصول للمتبرعين ----
    canReachDonors: yesNo(),
    donorsAccessNotes: textWhen('canReachDonors'),

    // ---- مساعدات خارجية ----
    receivesExternalAid: yesNo(),
    externalAidDetails: textWhen('receivesExternalAid'),

    // ---- السكن ----
    housingType: requiredText(),
    rentAmount: numberWhen('housingType', 'Rented'),

    // ---- العلاج ----
    requiredMedicalTreatment: requiredText(),
    medicalTreatmentCost: yup
        .number()
        .transform(emptyToNull)
        .typeError(NUM)
        .required(REQ)
        .min(0, 'القيمة لا يمكن أن تكون سالبة'),

    // ---- الديون ----
    hasDebt: yesNo(),
    debts: yup.array().when('hasDebt', {
        is: true,
        then: () =>
        yup
            .array()
            .of(
            yup.object({
                debtorCaseId: yup
                .number()
                .transform(emptyToNull)
                .typeError(REQ)
                .required(REQ),
                debtReason: requiredText(),
                debtAmount: yup
                .number()
                .transform(emptyToNull)
                .typeError(NUM)
                .required(REQ)
                .min(0.01, 'يجب أن يكون المبلغ أكبر من صفر'),
                creditor: requiredText(),
                isPaid: yesNo(),
                paidDate: yup
                .string()
                .nullable()
                .when('isPaid', {
                    is: true,
                    then: (s) => s.required(REQ),
                    otherwise: (s) => s.nullable(),
                }),
            })
            )
            .min(1, 'يجب إضافة دين واحد على الأقل'),
        otherwise: () => yup.array().nullable(),
    }),

    // ---- الإنفاق ----
    hasExcessiveSpending: yesNo(),
    spendingNotes: textWhen('hasExcessiveSpending'),

    // ---- العمل والسلوك ----
    providerWorkCapacity: requiredText(),
    isBeggingProfession: yesNo(),
    isSmoking: yesNo(),

    // ---- حالات الزواج ----
    hasMarriageCase: yesNo(),
    marriageCases: yup.array().when('hasMarriageCase', {
        is: true,
        then: () =>
        yup
            .array()
            .of(
            yup.object({
                groomName: requiredText(),
                groomJob: requiredText(),
                isGroomTraveling: yesNo(),
                marriageDate: yup.string().nullable().required(REQ),
                wifeId: yup
                .number()
                .transform(emptyToNull)
                .typeError(REQ)
                .required(REQ),
            })
            )
            .min(1, 'يجب إضافة حالة زواج واحدة على الأقل'),
        otherwise: () => yup.array().nullable(),
    }),

    // ---- الجهة المُحيلة ----
    referrerName: requiredText(),
    referrerPhone: phone(),

    // ---- مقدم البيانات ----
    dataProviderName: requiredText(),
    dataProviderRelation: requiredText(),
    dataProviderPhone: phone(),

    // ---- الباحث ----
    researcherName: requiredText(),
    });