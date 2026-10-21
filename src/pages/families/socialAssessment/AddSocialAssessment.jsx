import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router';
import { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { socialAssessmentSchema } from '@/constants/schemas/socialAssessmentSchema';
import {
  housingTypeOptions,
  pensionTypeOptions,
  yesNoOptions,
} from '@/constants/socialAssessment/socialAssessmentConst';
import useAddSocialAssessment from '@/hooks/socialAssessment/useAddSocialAssessment';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';

const AddSocialAssessment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { familyId, data, edit } = state || {};

  const queryClient = useQueryClient();
  const { addSocialAssessment, isPending } = useAddSocialAssessment();

  const initialValues = {
    familyId: familyId || 1,
    hasPension: false,
    pensionType: '',
    pensionAmount: 0,
    hasProperties: false,
    propertiesDetails: '',
    hasWellOffRelatives: false,
    wellOffRelativesRelationship: '',
    canReachDonors: false,
    donorsAccessNotes: '',
    receivesExternalAid: false,
    externalAidDetails: '',
    housingType: 'Rented',
    rentAmount: 0,
    requiredMedicalTreatment: '',
    medicalTreatmentCost: 0,
  };

  const formik = useFormik({
    initialValues: data || initialValues,
    validationSchema: socialAssessmentSchema,
    onSubmit: (values) => {
      const submitData = { ...values };
      
      if (!values.hasPension) {
        submitData.pensionType = '';
        submitData.pensionAmount = 0;
      }
      if (!values.hasProperties) {
        submitData.propertiesDetails = '';
      }
      if (!values.hasWellOffRelatives) {
        submitData.wellOffRelativesRelationship = '';
      }
      if (!values.canReachDonors) {
        submitData.donorsAccessNotes = '';
      }
      if (!values.receivesExternalAid) {
        submitData.externalAidDetails = '';
      }
      if (values.housingType !== 'Rented') {
        submitData.rentAmount = 0;
      }

      const mutationFn = edit 
        ? (d) => addSocialAssessment({ id: data.id, data: d })
        : addSocialAssessment;

      mutationFn(submitData, {
        onSuccess: () => {
          navigate('/families');
          queryClient.invalidateQueries({ queryKey: ['families'] });
          queryClient.invalidateQueries({ queryKey: ['familyById'] });
          formik.resetForm();
        },
      });
    },
  });

  const handleBooleanChange = useCallback((fieldName) => {
    return (e) => {
      const checked = e.target.checked;
      formik.setFieldValue(fieldName, checked);
      
      if (!checked) {
        switch (fieldName) {
          case 'hasPension':
            formik.setFieldValue('pensionType', '');
            formik.setFieldValue('pensionAmount', 0);
            break;
          case 'hasProperties':
            formik.setFieldValue('propertiesDetails', '');
            break;
          case 'hasWellOffRelatives':
            formik.setFieldValue('wellOffRelativesRelationship', '');
            break;
          case 'canReachDonors':
            formik.setFieldValue('donorsAccessNotes', '');
            break;
          case 'receivesExternalAid':
            formik.setFieldValue('externalAidDetails', '');
            break;
        }
      }
    };
  }, [formik]);

  const handleHousingTypeChange = useCallback((e) => {
    const value = e.target.value;
    formik.setFieldValue('housingType', value);
    if (value !== 'Rented') {
      formik.setFieldValue('rentAmount', 0);
    }
  }, [formik]);

  const renderBooleanField = (label, fieldName) => {
    const value = formik.values[fieldName];
    const error = formik.touched[fieldName] && formik.errors[fieldName];
    
    return (
      <div className="mb-4">
        <label className="block mb-2 font-medium">{label}</label>
        <div className="flex items-center gap-4">
          {yesNoOptions.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={fieldName}
                value={opt.id}
                checked={value === opt.id}
                onChange={handleBooleanChange(fieldName)}
                className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
              />
              <span>{opt.name}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  const renderInputField = (label, name, type = 'text', disabled = false, extraClasses = '') => {
    const error = formik.touched[name] && formik.errors[name];
    
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block mb-2 font-medium">{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          {...formik.getFieldProps(name)}
          disabled={disabled}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${extraClasses}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  const renderTextareaField = (label, name, disabled = false) => {
    const error = formik.touched[name] && formik.errors[name];
    
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block mb-2 font-medium">{label}</label>
        <textarea
          id={name}
          name={name}
          {...formik.getFieldProps(name)}
          disabled={disabled}
          rows={3}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  const renderSelectField = (label, name, options, disabled = false, onChange) => {
    const error = formik.touched[name] && formik.errors[name];
    
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block mb-2 font-medium">{label}</label>
        <select
          id={name}
          name={name}
          {...formik.getFieldProps(name)}
          disabled={disabled}
          onChange={onChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">اختر...</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <Layout headerText={edit ? 'تعديل البحث الاجتماعي' : 'إضافة بحث اجتماعي'}>
      <div className="container py-10 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/families" className="flex items-center gap-2 text-secondary hover:text-primary">
            <ArrowLeft size={20} />
            <span>العودة للقائمة</span>
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
          <input type="hidden" name="familyId" {...formik.getFieldProps('familyId')} />

          <div className="grid grid-cols-1  gap-6">
            {renderBooleanField('هل يوجد معاش؟', 'hasPension')}

            {formik.values.hasPension && (
              <>
                {renderSelectField('نوع المعاش', 'pensionType', pensionTypeOptions)}
                {renderInputField('مبلغ المعاش', 'pensionAmount', 'number', false, 'step="0.01" min="0"')}
              </>
            )}

            {renderBooleanField('هل يوجد أملاك؟', 'hasProperties')}

            {formik.values.hasProperties && renderTextareaField('تفاصيل الأملاك', 'propertiesDetails')}

            {renderBooleanField('هل يوجد أقارب ميسورون؟', 'hasWellOffRelatives')}

            {formik.values.hasWellOffRelatives && renderInputField('صلة القرابة', 'wellOffRelativesRelationship')}

            {renderBooleanField('القدرة على الوصول للمتبرعين', 'canReachDonors')}

            {formik.values.canReachDonors && renderTextareaField('ملاحظات الوصول للمتبرعين', 'donorsAccessNotes')}

            {renderBooleanField('تتلقى مساعدات خارجية؟', 'receivesExternalAid')}

            {formik.values.receivesExternalAid && renderTextareaField('تفاصيل المساعدات الخارجية', 'externalAidDetails')}

            {renderSelectField('نوع السكن', 'housingType', housingTypeOptions, false, handleHousingTypeChange)}

            {formik.values.housingType === 'Rented' && renderInputField('مبلغ الإيجار', 'rentAmount', 'number', false, 'step="0.01" min="0"')}

            {renderInputField('العلاج الطبي المطلوب', 'requiredMedicalTreatment')}
            {renderInputField('تكلفة العلاج الطبي', 'medicalTreatmentCost', 'number', false, 'step="0.01" min="0"')}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link to="/families">
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                إلغاء
              </button>
            </Link>
            <button 
              type="submit" 
              disabled={isPending} 
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 disabled:opacity-50"
            >
              {isPending ? 'جاري الحفظ...' : (edit ? 'تحديث' : 'إضافة')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddSocialAssessment;