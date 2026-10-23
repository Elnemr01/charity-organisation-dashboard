import Layout from '@/appComponents/layout/Layout';
import { use, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useFormik, getIn } from 'formik';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import useAddSocialAssessment from '@/hooks/socialAssessment/useAddSocialAssessment';
import { socialAssessmentSchema } from '@/constants/schemas/socialAssessmentSchema';
import { housingTypeOpts } from '@/constants/socialAssessment/socialAssessmentConst';
import useEditSocialAssessment from '@/hooks/socialAssessment/useEditSocialAssessment';
import Section from '@/appComponents/addSocialAssCom/Section';
import YesNoField from '@/appComponents/addSocialAssCom/YesNoField';
import TextField from '@/appComponents/addSocialAssCom/TextField';
import TextAreaField from '@/appComponents/addSocialAssCom/TextAreaField';
import SelectField from '@/appComponents/addSocialAssCom/SelectField';
import { buildPayload } from '@/utlis/buildPayload';


const AddSocialAssessment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { familyId, data, edit, cases } = state || {};

  const queryClient = useQueryClient();
  const { addSocialAssessment, isPending : addPending } = useAddSocialAssessment();
  const { editSocialAssessment, isPending : editPending } = useEditSocialAssessment();

  // أفراد العائلة للـ select (بنفترض إن كل فرد فيه id و name)
  const caseOptions = useMemo(
    () => (cases || []).map((c) => ({ id: c.id, label: c.name })),
    [cases]
  );



const gridClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';

const toStr = useMemo(() => (v) => (v === null || v === undefined ? '' : v), []);
const toDate = useMemo(() => (v) => (v ? String(v).slice(0, 10) : ''), []);
const toNum = useMemo(() => (v) => (v === '' || v === null || v === undefined ? null : Number(v)), []);
const toNullIfEmpty = useMemo(() => (v) => (v === '' || v === undefined ? null : v), []);

// يرجع أول قيمة موجودة (مفيدة لو الباك بيرجع object متداخل بدل id)
const pick = useMemo(() => (...vals) => vals.find((x) => x !== undefined && x !== null), []);

// يحوّل true/'true'/false/'false' لـ boolean، وأي حاجة تانية null (يعني لسه ما اختارش)
const toBool = (x) => {
  if (x === true || x === 'true') return true;
  if (x === false || x === 'false') return false;
  return null;
}

  const housingTypeOptions = useMemo(()=> housingTypeOpts,[])

  useEffect(() => {
    if (!familyId) {
      toast.error('لم يتم تحديد العائلة');
      navigate('/families', { replace: true });
    }
  }, [familyId, navigate]);

  const initialDebt = useMemo(
    () => ({
      debtorCaseId: '',
      debtReason: '',
      debtAmount: '',
      creditor: '',
      isPaid: null,
      paidDate: '',
    }),
    []
  );

  const initialMarriageCase = useMemo(
    () => ({
      groomName: '',
      groomJob: '',
      isGroomTraveling: null,
      marriageDate: '',
      wifeId: '',
    }),
    []
  );

  const initialValues = useMemo(() => {
    // في وضع التعديل بناخد من data، غير كده كله فاضي
    const d = edit && data ? data : {};

    const debts = (d.debts || []).map((x) => ({
      debtorCaseId: toStr(pick(x.debtorCaseId, x.debtorCase?.id)),
      debtReason: toStr(x.debtReason),
      debtAmount: toStr(x.debtAmount),
      creditor: toStr(x.creditor),
      isPaid: toBool(x.isPaid),
      paidDate: toDate(x.paidDate),
    }));

    const marriageCases = (d.marriageCases || []).map((x) => ({
      groomName: toStr(x.groomName),
      groomJob: toStr(x.groomJob),
      isGroomTraveling: toBool(x.isGroomTraveling),
      marriageDate: toDate(x.marriageDate),
      wifeId: toStr(pick(x.wifeId, x.wife?.id)),
    }));

    const hasDebt = toBool(d.hasDebt);
    const hasMarriageCase = toBool(d.hasMarriageCase);

    return {
      familyId: pick(familyId, d.familyId) ?? '',

      hasPension: toBool(d.hasPension),
      pensionType: toStr(d.pensionType),
      pensionAmount: toStr(d.pensionAmount),

      hasProperties: toBool(d.hasProperties),
      propertiesDetails: toStr(d.propertiesDetails),

      hasWellOffRelatives: toBool(d.hasWellOffRelatives),
      wellOffRelativesRelationship: toStr(d.wellOffRelativesRelationship),

      canReachDonors: toBool(d.canReachDonors),
      donorsAccessNotes: toStr(d.donorsAccessNotes),

      receivesExternalAid: toBool(d.receivesExternalAid),
      externalAidDetails: toStr(d.externalAidDetails),

      housingType: toStr(d.housingType),
      rentAmount: toStr(d.rentAmount),

      requiredMedicalTreatment: toStr(d.requiredMedicalTreatment),
      medicalTreatmentCost: toStr(d.medicalTreatmentCost),

      hasDebt,
      // لو فيه ديون لازم يبقى فيه صف واحد على الأقل يتعرض
      debts: hasDebt && debts.length === 0 ? [initialDebt] : debts,

      hasExcessiveSpending: toBool(d.hasExcessiveSpending),
      spendingNotes: toStr(d.spendingNotes),

      providerWorkCapacity: toStr(d.providerWorkCapacity),
      isBeggingProfession: toBool(d.isBeggingProfession),
      isSmoking: toBool(d.isSmoking),

      hasMarriageCase,
      marriageCases:
        hasMarriageCase && marriageCases.length === 0
          ? [initialMarriageCase]
          : marriageCases,

      referrerName: toStr(d.referrerName),
      referrerPhone: toStr(d.referrerPhone),

      dataProviderName: toStr(d.dataProviderName),
      dataProviderRelation: toStr(d.dataProviderRelation),
      dataProviderPhone: toStr(d.dataProviderPhone),

      researcherName: toStr(d.researcherName),
    };
  }, [edit, data, familyId, initialDebt, initialMarriageCase]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: socialAssessmentSchema,
    onSubmit: (values) => {
      if (edit) {
        editSocialAssessment({
          id: data.id,
          data: buildPayload(values)
        },{
          onSuccess: ()=> {
            resetData()
          }
        })
      }
      else {
        addSocialAssessment(buildPayload(values), {
          onSuccess: () => {
            resetData()
          },
        });
      }
    },
  });

  const resetData= useCallback(()=> {
    queryClient.invalidateQueries({ queryKey: ['familyById'] });
    formik.resetForm();
    navigate(-1);
  },[])

  const v = formik.values;

  /* ---------------------------- debts ---------------------------- */
  const handleHasDebtChange = (val) => {
    if (val && v.debts.length === 0) {
      formik.setFieldValue('debts', [initialDebt]);
    }
    if (!val) formik.setFieldValue('debts', []);
  };

  const addDebt = () => formik.setFieldValue('debts', [...v.debts, initialDebt]);

  const removeDebt = (index) => {
    if (v.debts.length <= 1) {
      toast.error('يجب أن يوجد دين واحد على الأقل');
      return;
    }
    formik.setFieldValue('debts', v.debts.filter((_, i) => i !== index));
  };

  /* ------------------------ marriage cases ------------------------ */
  const handleHasMarriageChange = (val) => {
    if (val && v.marriageCases.length === 0) {
      formik.setFieldValue('marriageCases', [initialMarriageCase]);
    }
    if (!val) formik.setFieldValue('marriageCases', []);
  };

  const addMarriageCase = () =>
    formik.setFieldValue('marriageCases', [...v.marriageCases, initialMarriageCase]);

  const removeMarriageCase = (index) => {
    if (v.marriageCases.length <= 1) {
      toast.error('يجب أن توجد حالة زواج واحدة على الأقل');
      return;
    }
    formik.setFieldValue(
      'marriageCases',
      v.marriageCases.filter((_, i) => i !== index)
    );
  };

  const arrayLevelError = (name) => {
    const err = getIn(formik.errors, name);
    return typeof err === 'string' && formik.submitCount > 0 ? (
      <p className="text-red-500 text-sm">{err}</p>
    ) : null;
  };

  return (
    <Layout headerText={edit ? 'تعديل البحث الاجتماعي' : 'إضافة بحث اجتماعي'}>
      <div className="container py-10 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-secondary hover:text-primary"
          >
            <ArrowLeft size={20} />
            <span>رجوع</span>
          </button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-8"
          dir="rtl"
        >
          {/* ============ المعاش ============ */}
          <Section title="المعاش">
            <YesNoField formik={formik} name="hasPension" label="هل يوجد معاش؟" />
            {v.hasPension && (
              <div className={gridClass}>
                <TextField formik={formik} name="pensionType" label="نوع المعاش" />
                <TextField
                  formik={formik}
                  name="pensionAmount"
                  label="قيمة المعاش"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            )}
          </Section>

          {/* ============ الممتلكات ============ */}
          <Section title="الممتلكات">
            <YesNoField formik={formik} name="hasProperties" label="هل يملك ممتلكات؟" />
            {v.hasProperties && (
              <div className={gridClass}>
                <div className="sm:col-span-2 lg:col-span-4">
                  <TextAreaField
                    formik={formik}
                    name="propertiesDetails"
                    label="تفاصيل الممتلكات"
                  />
                </div>
              </div>
            )}
          </Section>

          {/* ============ الأقارب الميسورين ============ */}
          <Section title="الأقارب الميسورين الحال">
            <YesNoField
              formik={formik}
              name="hasWellOffRelatives"
              label="هل يوجد أقارب ميسورين الحال؟"
            />
            {v.hasWellOffRelatives && (
              <div className={gridClass}>
                <div className="sm:col-span-2 lg:col-span-4">
                  <TextAreaField
                    formik={formik}
                    name="wellOffRelativesRelationship"
                    label="صلة القرابة"
                  />
                </div>
              </div>
            )}
          </Section>

          {/* ============ المتبرعين والمساعدات الخارجية ============ */}
          <Section title="المتبرعين والمساعدات الخارجية">
            <YesNoField
              formik={formik}
              name="canReachDonors"
              label="هل يستطيع الوصول إلى متبرعين؟"
            />
            {v.canReachDonors && (
              <div className={gridClass}>
                <div className="sm:col-span-2 lg:col-span-4">
                  <TextAreaField
                    formik={formik}
                    name="donorsAccessNotes"
                    label="ملاحظات عن الوصول للمتبرعين"
                  />
                </div>
              </div>
            )}

            <div className="border-t pt-5 space-y-5">
              <YesNoField
                formik={formik}
                name="receivesExternalAid"
                label="هل يتلقى مساعدات خارجية؟"
              />
              {v.receivesExternalAid && (
                <div className={gridClass}>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <TextAreaField
                      formik={formik}
                      name="externalAidDetails"
                      label="تفاصيل المساعدات الخارجية"
                    />
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* ============ السكن ============ */}
          <Section title="السكن">
            <SelectField
              formik={formik}
              name="housingType"
              label="نوع السكن"
              placeholder="اختر نوع السكن"
              options={housingTypeOptions}
            />
            {v.housingType === 'Rented' && (
              <div className={gridClass}>
                <TextField
                  formik={formik}
                  name="rentAmount"
                  label="قيمة الإيجار"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            )}
          </Section>

          {/* ============ العلاج ============ */}
          <Section title="العلاج الطبي">
            <div className={gridClass}>
            <TextField
              formik={formik}
              name="requiredMedicalTreatment"
              label="العلاج الطبي المطلوب"
            />
              <TextField
                formik={formik}
                name="medicalTreatmentCost"
                label="تكلفة العلاج"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </Section>

          {/* ============ الديون ============ */}
          <Section title="الديون">
            <YesNoField
              formik={formik}
              name="hasDebt"
              label="هل توجد ديون؟"
              onChange={handleHasDebtChange}
            />

            {v.hasDebt && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">قائمة الديون</h4>
                  <Button type="button" variant="outline" onClick={addDebt} className="gap-2">
                    <Plus size={16} /> إضافة دين
                  </Button>
                </div>
                {arrayLevelError('debts')}

                {v.debts.map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-medium">دين #{index + 1}</h5>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDebt(index)}
                        className="text-red-500 hover:text-red-500"
                        disabled={v.debts.length <= 1}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <div className={gridClass}>
                      <SelectField
                        formik={formik}
                        name={`debts[${index}].debtorCaseId`}
                        label="المدين"
                        placeholder="اختر الفرد"
                        options={caseOptions}
                      />
                      <TextField
                        formik={formik}
                        name={`debts[${index}].debtReason`}
                        label="سبب الدين"
                      />
                      <TextField
                        formik={formik}
                        name={`debts[${index}].debtAmount`}
                        label="مبلغ الدين"
                        type="number"
                        step="0.01"
                        min="0.01"
                      />
                      <TextField
                        formik={formik}
                        name={`debts[${index}].creditor`}
                        label="الدائن"
                      />
                      <YesNoField
                        formik={formik}
                        name={`debts[${index}].isPaid`}
                        label="هل تم السداد؟"
                        onChange={(val) => {
                          if (!val) formik.setFieldValue(`debts[${index}].paidDate`, '');
                        }}
                      />
                      {v.debts[index].isPaid && (
                        <TextField
                          formik={formik}
                          name={`debts[${index}].paidDate`}
                          label="تاريخ السداد"
                          type="date"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ============ الإنفاق ============ */}
          <Section title="الإنفاق">
            <YesNoField
              formik={formik}
              name="hasExcessiveSpending"
              label="هل يوجد إنفاق مفرط؟"
            />
            {v.hasExcessiveSpending && (
              <div className={gridClass}>
                <div className="sm:col-span-2 lg:col-span-4">
                  <TextAreaField
                    formik={formik}
                    name="spendingNotes"
                    label="ملاحظات الإنفاق"
                  />
                </div>
              </div>
            )}
          </Section>

          {/* ============ العمل والسلوك ============ */}
          <Section title="العمل والسلوك">
              <TextField
                formik={formik}
                name="providerWorkCapacity"
                label="القدرة على العمل لدى المعيل"
              />
            <div className={gridClass}>
              <YesNoField
                formik={formik}
                name="isBeggingProfession"
                label="هل مهنته التسول؟"
              />
              <YesNoField formik={formik} name="isSmoking" label="هل يدخن؟" />
            </div>
          </Section>

          {/* ============ حالات الزواج ============ */}
          <Section title="حالات الزواج">
            <YesNoField
              formik={formik}
              name="hasMarriageCase"
              label="هل توجد حالة زواج؟"
              onChange={handleHasMarriageChange}
            />

            {v.hasMarriageCase && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">قائمة حالات الزواج</h4>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMarriageCase}
                    className="gap-2"
                  >
                    <Plus size={16} /> إضافة حالة زواج
                  </Button>
                </div>
                {arrayLevelError('marriageCases')}

                {v.marriageCases.map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-medium">حالة زواج #{index + 1}</h5>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMarriageCase(index)}
                        className="text-red-500 hover:text-red-500"
                        disabled={v.marriageCases.length <= 1}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <div className={gridClass}>
                      <TextField
                        formik={formik}
                        name={`marriageCases[${index}].groomName`}
                        label="اسم العريس"
                      />
                      <TextField
                        formik={formik}
                        name={`marriageCases[${index}].groomJob`}
                        label="وظيفة العريس"
                      />
                      <SelectField
                        formik={formik}
                        name={`marriageCases[${index}].wifeId`}
                        label="العروسة"
                        placeholder="اختر العروسة"
                        options={caseOptions}
                      />
                      <TextField
                        formik={formik}
                        name={`marriageCases[${index}].marriageDate`}
                        label="تاريخ الزواج"
                        type="date"
                      />
                      <YesNoField
                        formik={formik}
                        name={`marriageCases[${index}].isGroomTraveling`}
                        label="هل العريس مسافر؟"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ============ الجهة المُحيلة ============ */}
          <Section title="من احضر اسم المستفيد الى الجمعيه">
            <div className={gridClass}>
            <TextField formik={formik} name="referrerName" label="الاسم" />
              <TextField formik={formik} name="referrerPhone" label="هاتفه" />
            </div>
          </Section>

          {/* ============ مقدم البيانات ============ */}
          <Section title="مصدر البيانات">
            <div className={gridClass}>
            <TextField formik={formik} name="dataProviderName" label="اسمه" />
              <TextField
                formik={formik}
                name="dataProviderRelation"
                label="صلته بالأسرة"
              />
              <TextField
                formik={formik}
                name="dataProviderPhone"
                label="هاتفه "
              />
            </div>
          </Section>

          {/* ============ الباحث ============ */}
          <Section title="الباحث الاجتماعي">
            <TextField formik={formik} name="researcherName" label="اسم الباحث" />
          </Section>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={addPending || editPending} className="bg-secondary hover:bg-secondary">
              {
                edit ? 
                editPending ? 'جاري التعديل...' : 'تعديل البحث الاجتماعي'
                :
                addPending ? 'جاري الإضافة...' : 'إضافة البحث الاجتماعي'
              }
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddSocialAssessment;