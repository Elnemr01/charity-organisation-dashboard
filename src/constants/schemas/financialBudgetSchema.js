import * as yup from 'yup';


const msg='هذا الحقل مطلوب'


export const editFinancialBudgetSchema = yup.object().shape({
  familyId: yup.number(),
  fatherIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').transform((value) => (isNaN(value) ? 0 : value)),
  motherIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  childrenIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  pensionIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  inheritanceOrPropertiesIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  permanentAidIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  temporaryAidIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  otherIncome: yup.string().required(msg).typeError(msg).min(0, 'الدخل يجب أن يكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  basicNeedsExpenses: yup.string().required(msg).typeError('مصاريف الضروريات مطلوبة').min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').transform((value) => (isNaN(value) ? 0 : value)),
  utilitiesExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  rentExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  medicalExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  basicEducationExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  higherEducationExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  debtExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
  irregularWorkEmergencyExpenses: yup.string().required(msg).typeError(msg).min(0, 'المصاريف يجب أن تكون أكبر من أو يساوي صفر').default(0).transform((value) => (isNaN(value) ? 0 : value)),
});