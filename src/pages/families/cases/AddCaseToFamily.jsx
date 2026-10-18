import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Trash2 } from 'lucide-react';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllCaseCategories from '@/hooks/categories/case/useGetAllCaseCategories';
import useAddCase from '@/hooks/cases/useAddCase';
import useAddNewCaseCategory from '@/hooks/categories/case/useAddNewCaseCategory';
import { caseValidation } from '@/constants/schemas/familySchema';
import { useQueryClient } from '@tanstack/react-query';
import {
  relationToFamilyOptions,
  maritalStatusOptions,
  educationStatusOptions,
  genderOptions,
} from '@/constants/families/familyEnums';
import useEditCase from '@/hooks/cases/useEditCase';

const AddCaseToFamily = () => {
  const [caseCat, setCaseCat] = useState([]);
  const [catPage, setCatPage] = useState(1);
  const [catDebounceValue, setCatDebounceValue] = useState('');

  const { caseCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAllCaseCategories({
    page: catPage,
    searchValue: catDebounceValue,
  });


  const { addCase, isPending :addPending } = useAddCase();
  const {editCase,isPending:editPending}=useEditCase();
  const { addNewCaseCategory, isPending: addCategoryPending } = useAddNewCaseCategory();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const location=useLocation();
  const familyId=location?.state?.familyId
  const edit=location?.state?.edit
  const data=location?.state?.data

  console.log(data);

  const formik = useFormik({
    initialValues: edit ?{
      nationalId: data?.nationalId || null,
      name: data?.name || null,
      nickName: data?.nickName || null,
      gender: data?.gender || null,
      birthDate: data?.birthDate || '',
      maritalStatus: data?.maritalStatus || null,
      job: data?.job || '',
      jobIncome: data?.jobIncome || null,
      educationStatus: data?.educationStatus || null,
      healthStatus: data?.healthStatus || '',
      relationToFamily: data?.relationToFamily || null,
      phone: data?.phone || '',
      categoryIds: data?.categories?.map((cat) => cat.id) || [],
      familyId:data?.familyId
      } : {
      nationalId: '',
      name: '',
      nickName: null,
      gender: null,
      birthDate: '',
      maritalStatus: null,
      job: '',
      jobIncome: null,
      educationStatus: null,
      healthStatus: '',
      relationToFamily: null,
      phone: '',
      categoryIds: [],
      familyId
    },
    validationSchema: caseValidation,
    onSubmit: (values) => {
      if(edit) {
        editCase({
          id: data?.id,
          data: values
        },{
          onSuccess: () => {
            resetData();
          },
        });
        return;
      }
      addCase(
        values, {
        onSuccess: () => {
          resetData();
        },
      });
    },
  });

  const resetData = useCallback(() => {
    navigate('/cases');
    queryClient.invalidateQueries({ queryKey: ['cases'] });
    formik.resetForm();
  }, []);

  // Handle case category selection
  const handleCaseCategorySelect = (item) => {
    formik.setFieldValue('categoryIds', [...formik.values.categoryIds, item.id]);
    setCaseCat((old) => [...old, item.name]);
  };

  const handleCaseCategoryRemove = (catIndex) => {
    formik.setFieldValue('categoryIds', formik.values.categoryIds.filter((_, index) => index !== catIndex));
    setCaseCat((old) => old.filter((_, index) => index !== catIndex));
  };

  return (
    <Layout headerText={'إضافة حالة جديدة'}>
      <div className="container py-10 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cases" className="flex items-center gap-2 text-secondary hover:text-primary">
            <ArrowLeft size={20} />
            <span>العودة للقائمة</span>
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="nationalId" className="block mb-2">الرقم القومي </label>
              <Input
                id="nationalId"
                {...formik.getFieldProps('nationalId')}
                className={`${formik.touched.nationalId && formik.errors.nationalId ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.nationalId && formik.errors.nationalId && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.nationalId}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block mb-2">الاسم </label>
              <Input
                id="name"
                {...formik.getFieldProps('name')}
                className={`${formik.touched.name && formik.errors.name ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="nickName" className="block mb-2">اللقب</label>
              <Input
                id="nickName"
                {...formik.getFieldProps('nickName')}
                className="p-2 py-1"
              />
            </div>

            <div>
              <label className="block mb-2">النوع </label>
              <select
                {...formik.getFieldProps('gender')}
                className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                  ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">اختر النوع</option>
                {genderOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>{opt.label}</option>
                ))}
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">تاريخ الميلاد </label>
              <Input
                type="date"
                {...formik.getFieldProps('birthDate')}
                className={`${formik.touched.birthDate && formik.errors.birthDate ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.birthDate && formik.errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.birthDate}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">الحالة الاجتماعية </label>
              <select
                {...formik.getFieldProps('maritalStatus')}
                className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                  ${formik.touched.maritalStatus && formik.errors.maritalStatus ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">اختر الحالة الاجتماعية</option>
                {maritalStatusOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>{opt.label}</option>
                ))}
              </select>
              {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.maritalStatus}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">العمل </label>
              <Input
                {...formik.getFieldProps('job')}
                className={`${formik.touched.job && formik.errors.job ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.job && formik.errors.job && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.job}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">الدخل </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...formik.getFieldProps('jobIncome')}
                className={`${formik.touched.jobIncome && formik.errors.jobIncome ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.jobIncome && formik.errors.jobIncome && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.jobIncome}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">المستوى التعليمي </label>
              <select
                {...formik.getFieldProps('educationStatus')}
                className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                  ${formik.touched.educationStatus && formik.errors.educationStatus ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">اختر المستوى التعليمي</option>
                {educationStatusOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>{opt.label}</option>
                ))}
              </select>
              {formik.touched.educationStatus && formik.errors.educationStatus && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.educationStatus}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">الحالة الصحية </label>
              <Input
                {...formik.getFieldProps('healthStatus')}
                className={`${formik.touched.healthStatus && formik.errors.healthStatus ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.healthStatus && formik.errors.healthStatus && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.healthStatus}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">الصلة بالعائلة </label>
              <select
                {...formik.getFieldProps('relationToFamily')}
                className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                  ${formik.touched.relationToFamily && formik.errors.relationToFamily ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">اختر الصلة</option>
                {relationToFamilyOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>{opt.label}</option>
                ))}
              </select>
              {formik.touched.relationToFamily && formik.errors.relationToFamily && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.relationToFamily}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">رقم الهاتف </label>
              <Input
                {...formik.getFieldProps('phone')}
                className={`${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div>
              <div className='flex itmes-center justify-between'>
                <label className="block mb-2">تصنيف الحالة</label>
                <CategoryListFilter
                  setCategoryName={(item) => handleCaseCategorySelect(item)}
                  response={caseCategories}
                  isLoading={isLoadingCategories}
                  isError={isErrorCategories}
                  setPage={setCatPage}
                  setCatDebounceValue={setCatDebounceValue}
                  text={'اختر التصنيف'}
                  add={true}
                  addNewItem={addNewCaseCategory}
                  addWait={addCategoryPending}
                  queryKey={'caseCategories'}
                />
                {formik.touched.categoryIds && formik.errors.categoryIds && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.categoryIds}</p>
                )}
              </div>
              {
                caseCat.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseCat.map((cat, catIndex) => (
                      <span key={catIndex} className="bg-secondary text-white px-3 py-1 rounded-full">
                        {cat}
                        <Trash2 size={12} className="inline-block ml-1 cursor-pointer mr-4"
                        onClick={() => handleCaseCategoryRemove(catIndex)}
                        />
                      </span>
                    ))}
                  </div>
                )
              }
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link to="/cases">
              <Button type="button" variant="outline">إلغاء</Button>
            </Link>
            <Button type="submit" disabled={editPending || addPending} className="bg-secondary hover:bg-secondary">
              {
                edit ? editPending ? 'جاري تعديل الحالة...' : 'تعديل الحالة' : addPending ? 'جاري إضافة الحالة...' : 'إضافة الحالة'
              }
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCaseToFamily;