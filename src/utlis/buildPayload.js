

const toNum = (v) => (v === '' || v === null || v === undefined ? null : Number(v));
const toNullIfEmpty = (v) => (v === '' || v === undefined ? null : v);

export const buildPayload = (v) => ({
    familyId: Number(v.familyId),

    hasPension: v.hasPension,
    pensionType: v.hasPension ? v.pensionType : null,
    pensionAmount: v.hasPension ? toNum(v.pensionAmount) : null,

    hasProperties: v.hasProperties,
    propertiesDetails: v.hasProperties ? v.propertiesDetails : null,

    hasWellOffRelatives: v.hasWellOffRelatives,
    wellOffRelativesRelationship: v.hasWellOffRelatives
        ? v.wellOffRelativesRelationship
        : null,

    canReachDonors: v.canReachDonors,
    donorsAccessNotes: v.canReachDonors ? v.donorsAccessNotes : null,

    receivesExternalAid: v.receivesExternalAid,
    externalAidDetails: v.receivesExternalAid ? v.externalAidDetails : null,

    housingType: v.housingType,
    rentAmount: v.housingType === 'Rented' ? toNum(v.rentAmount) : null,

    requiredMedicalTreatment: v.requiredMedicalTreatment,
    medicalTreatmentCost: toNum(v.medicalTreatmentCost),

    hasDebt: v.hasDebt,
    debts: v.hasDebt
        ? v.debts.map((d) => ({
            debtorCaseId: Number(d.debtorCaseId),
            debtReason: d.debtReason,
            debtAmount: toNum(d.debtAmount),
            creditor: d.creditor,
            isPaid: d.isPaid,
            paidDate: d.isPaid ? toNullIfEmpty(d.paidDate) : null,
            }))
        : [],

    hasExcessiveSpending: v.hasExcessiveSpending,
    spendingNotes: v.hasExcessiveSpending ? v.spendingNotes : null,

    providerWorkCapacity: v.providerWorkCapacity,
    isBeggingProfession: v.isBeggingProfession,
    isSmoking: v.isSmoking,

    hasMarriageCase: v.hasMarriageCase,
    marriageCases: v.hasMarriageCase
        ? v.marriageCases.map((m) => ({
            groomName: m.groomName,
            groomJob: m.groomJob,
            isGroomTraveling: m.isGroomTraveling,
            marriageDate: m.marriageDate,
            wifeId: Number(m.wifeId),
            }))
        : null,

    referrerName: v.referrerName,
    referrerPhone: v.referrerPhone,

    dataProviderName: v.dataProviderName,
    dataProviderRelation: v.dataProviderRelation,
    dataProviderPhone: v.dataProviderPhone,

    researcherName: v.researcherName,
});