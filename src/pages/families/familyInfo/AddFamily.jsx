import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllAidCategories from '@/hooks/categories/aid/useGetAllAidCategories';
import useAddFamily from '@/hooks/families/useAddFamily';
import useAddNewAidCategory from '@/hooks/categories/aid/useAddNewAidCategory';
import { familySchema } from '@/constants/schemas/familySchema';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  relationToFamilyOptions,
  maritalStatusOptions,
  educationStatusOptions,
  genderOptions,
} from '@/constants/families/familyEnums';
import { familyStatusOptions } from '@/constants/families/familyConst';
import FilterVals from '@/components/customUI/FilterVals';

const AddFamily = () => {
  const [familyCat,setFamilyCat] = useState([]);
  const [caseCat,setCaseCat] = useState([[]]);
  const [catPage, setCatPage] = useState(1);
  const [catDebounceValue, setCatDebounceValue] = useState('');

  const { aidCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAllAidCategories({
    page: catPage,
    searchValue: catDebounceValue,
  });

  const { addFamily, isPending } = useAddFamily();
  const { addNewAidCategory, isPending: addCategoryPending } = useAddNewAidCategory();
  const familyStatusOptionsArr=useMemo(()=>familyStatusOptions,[]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const initialCase = useMemo(() => ({
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
    isPrimaryReceiver: false,
    categoryIds: [],
  }), []);

  const formik = useFormik({
    initialValues: {
      name: '',
      primaryReceiverId: null,
      region: '',
      address: '',
      cashRequired: null,
      decision: "Pending",
      decisionReason:null,
      categoryIds: [],
      cases: [initialCase],
    },
    validationSchema: familySchema,
    onSubmit: (values) => {
      const hasPrimaryReceiver = values.cases.some(c => c.isPrimaryReceiver);
      if (!hasPrimaryReceiver) {
        toast.error('يجب تحديد مستفيد رئيسي واحد على الأقل');
        return;
      }

      const primaryReceivers = values.cases.filter(c => c.isPrimaryReceiver);
      if (primaryReceivers.length > 1) {
        toast.error('يمكن تحديد مستفيد رئيسي واحد فقط');
        return;
      }

      if (values.primaryReceiverId === null && primaryReceivers.length === 1) {
        values.primaryReceiverId = null;
      }


        addFamily(values, {
          onSuccess: () => {
            resetData();
          },
        });
    },
  });


  const resetData =useCallback(()=> {
    navigate('/families');
    queryClient.invalidateQueries({ queryKey: ['families'] });
    formik.resetForm();
  },[]);

  const addCase = () => {
    formik.setFieldValue('cases', [...formik.values.cases, initialCase]);
  };

  const removeCase = (index) => {
    if (formik.values.cases.length <= 1) {
      toast.error('يجب أن توجد حالة واحدة على الأقل');
      return;
    }
    const newCases = formik.values.cases.filter((_, i) => i !== index);
    formik.setFieldValue('cases', newCases);
  };

  // Handle family category selection
  const handleCategorySelect = (item) => {
    formik.setFieldValue('categoryIds', [...formik.values.categoryIds, item.id]);
    setFamilyCat((old)=> [...old, item.name]);
  };

  const handleCategoryRemove = (i) => {
    formik.setFieldValue('categoryIds', formik.values.categoryIds.filter((_, index) => index !== i));
    setFamilyCat((old)=> old.filter((_, index) => index !== i));
  };

  // Handle case category selection
  const handleCaseCategorySelect = (index, item) => {
    const cases = [...formik.values.cases];
    cases[index].categoryIds = [...cases[index].categoryIds, item.id];
    formik.setFieldValue('cases', cases);

    if(index >= caseCat.length) {
      setCaseCat((old)=> [...old, [item.name]]);
    } else {
      const caseCats= [...caseCat];
      caseCats[index] = [...caseCats[index], item.name];
      setCaseCat(caseCats);
    }
  };

  // handle case category removal
  const handleCaseCategoryRemove = (caseIndex, catIndex) => {
    const cases = [...formik.values.cases];
    cases[caseIndex].categoryIds = cases[caseIndex].categoryIds.filter((_, index) => index !== catIndex);
    formik.setFieldValue('cases', cases);

    const caseCats= [...caseCat];
    caseCats[caseIndex] = caseCats[caseIndex].filter((_, index) => index !== catIndex);
    setCaseCat(caseCats);
  };

  const handlePrimaryReceiverChange = (index) => {
    const cases = [...formik.values.cases];
    cases.forEach((c, i) => {
      cases[i].isPrimaryReceiver = i === index;
    });
    formik.setFieldValue('cases', cases);
  };

  return (
    <Layout headerText={'إضافة عائلة جديدة'}>
      <div className="container py-10 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/families" className="flex items-center gap-2 text-secondary hover:text-primary">
            <ArrowLeft size={20} />
            <span>العودة للقائمة</span>
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2">اسم العائلة </label>
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
              <label htmlFor="region" className="block mb-2">المنطقة </label>
              <Input
                id="region"
                {...formik.getFieldProps('region')}
                className={`${formik.touched.region && formik.errors.region ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.region && formik.errors.region && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.region}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block mb-2">العنوان </label>
              <Input
                id="address"
                {...formik.getFieldProps('address')}
                className={`${formik.touched.address && formik.errors.address ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="cashRequired" className="block mb-2">المبلغ النقدي المطلوب </label>
              <Input
                id="cashRequired"
                type="number"
                step="0.01"
                min="0.01"
                {...formik.getFieldProps('cashRequired')}
                className={`${formik.touched.cashRequired && formik.errors.cashRequired ? 'border-red-500' : ''} p-2 py-1`}
              />
              {formik.touched.cashRequired && formik.errors.cashRequired && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.cashRequired}</p>
              )}
            </div>

            <div >
              <div className='flex items-center justify-between'>
                <label className="block mb-2"> تصنيف العائله </label>
                <CategoryListFilter
                  setCategoryName={(item)=> handleCategorySelect(item,'family')}
                  response={aidCategories}
                  isLoading={isLoadingCategories}
                  isError={isErrorCategories}
                  setPage={setCatPage}
                  setCatDebounceValue={setCatDebounceValue}
                  text={'اختر الفئة'}
                  add={true}
                  addNewItem={addNewAidCategory}
                  addWait={addCategoryPending}
                  queryKey={'aidCategories'}
                />
                {formik.touched.categoryIds && formik.errors.categoryIds && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.categoryIds}</p>
                )}
              </div>
                {
                  familyCat.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {familyCat.map((cat, index) => (
                        <span key={index} className="bg-secondary text-white px-3 py-1 rounded-full">
                          {cat}
                          <Trash2 size={12} className="inline-block ml-1 cursor-pointer mr-4 t"
                          onClick={() => handleCategoryRemove(index)} />
                        </span>
                      ))}
                    </div>
                  )
                }
              </div>

            <div className={'flex items-center justify-between'} >
              <label htmlFor="decision">قرار الجمعيه</label>
              <FilterVals
              data={familyStatusOptionsArr}
              setFilter={(item)=>formik.setFieldValue('decision',item.id)}
              />
            </div>

          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="decisionReason">اسباب الرفض او القبول (ملاحظات)</label>
            <textarea name="decisionReason"
            onChange={formik.handleChange}
            id="decisionReason"
            className="p-2 border rounded-md h-30"
            placeholder='اسباب الرفض او القبول (ملاحظات)'
            >

            </textarea>
          </div>
          

          <div className="space-y-4 my-8 border-t pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">أفراد العائلة (الحالات) </h3>
              <Button type="button" variant="outline" onClick={addCase} className="gap-2">
                <Plus size={16} /> إضافة فرد
              </Button>
            </div>

            {formik.values.cases.map((caseItem, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 my-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="font-medium mb-4">فرد #{index + 1}</h4>
                    <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...formik.getFieldProps(`cases[${index}].isPrimaryReceiver`)}
                      onChange={() => handlePrimaryReceiverChange(index)}
                      className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                    />
                    <label className="text-sm">مستفيد رئيسي</label>
                  </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCase(index)}
                    className="text-red-500 hover:text-red-500"
                    disabled={formik.values.cases.length <= 1}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block mb-2">الرقم القومي </label>
                    <Input
                      {...formik.getFieldProps(`cases[${index}].nationalId`)}
                      className={`${formik.touched.cases?.[index]?.nationalId && formik.errors.cases?.[index]?.nationalId ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.nationalId && formik.errors.cases?.[index]?.nationalId && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].nationalId}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">الاسم </label>
                    <Input
                      {...formik.getFieldProps(`cases[${index}].name`)}
                      className={`${formik.touched.cases?.[index]?.name && formik.errors.cases?.[index]?.name ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.name && formik.errors.cases?.[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">اللقب</label>
                    <Input
                      {...formik.getFieldProps(`cases[${index}].nickName`)}
                      className="p-2 py-1"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">النوع </label>
                    <select
                      {...formik.getFieldProps(`cases[${index}].gender`)}
                      className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                        ${formik.touched.cases?.[index]?.gender && formik.errors.cases?.[index]?.gender ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">اختر النوع</option>
                      {genderOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                    {formik.touched.cases?.[index]?.gender && formik.errors.cases?.[index]?.gender && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].gender}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">تاريخ الميلاد </label>
                    <Input
                      type="date"
                      {...formik.getFieldProps(`cases[${index}].birthDate`)}
                      className={`${formik.touched.cases?.[index]?.birthDate && formik.errors.cases?.[index]?.birthDate ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.birthDate && formik.errors.cases?.[index]?.birthDate && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].birthDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">الحالة الاجتماعية </label>
                    <select
                      {...formik.getFieldProps(`cases[${index}].maritalStatus`)}
                      className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                        ${formik.touched.cases?.[index]?.maritalStatus && formik.errors.cases?.[index]?.maritalStatus ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">اختر الحالة الاجتماعية</option>
                      {maritalStatusOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                    {formik.touched.cases?.[index]?.maritalStatus && formik.errors.cases?.[index]?.maritalStatus && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].maritalStatus}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">العمل </label>
                    <Input
                      {...formik.getFieldProps(`cases[${index}].job`)}
                      className={`${formik.touched.cases?.[index]?.job && formik.errors.cases?.[index]?.job ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.job && formik.errors.cases?.[index]?.job && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].job}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">الدخل </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...formik.getFieldProps(`cases[${index}].jobIncome`)}
                      className={`${formik.touched.cases?.[index]?.jobIncome && formik.errors.cases?.[index]?.jobIncome ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.jobIncome && formik.errors.cases?.[index]?.jobIncome && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].jobIncome}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">المستوى التعليمي </label>
                    <select
                      {...formik.getFieldProps(`cases[${index}].educationStatus`)}
                      className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                        ${formik.touched.cases?.[index]?.educationStatus && formik.errors.cases?.[index]?.educationStatus ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">اختر المستوى التعليمي</option>
                      {educationStatusOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                    {formik.touched.cases?.[index]?.educationStatus && formik.errors.cases?.[index]?.educationStatus && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].educationStatus}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">الحالة الصحية </label>
                    <Input
                      {...formik.getFieldProps(`cases[${index}].healthStatus`)}
                      className={`${formik.touched.cases?.[index]?.healthStatus && formik.errors.cases?.[index]?.healthStatus ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.healthStatus && formik.errors.cases?.[index]?.healthStatus && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].healthStatus}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">الصلة بالعائلة </label>
                    <select
                      {...formik.getFieldProps(`cases[${index}].relationToFamily`)}
                      className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary
                        ${formik.touched.cases?.[index]?.relationToFamily && formik.errors.cases?.[index]?.relationToFamily ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">اختر الصلة</option>
                      {relationToFamilyOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                    {formik.touched.cases?.[index]?.relationToFamily && formik.errors.cases?.[index]?.relationToFamily && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].relationToFamily}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2">رقم الهاتف </label>
                    <Input
                      {...formik.getFieldProps(`cases[${index}].phone`)}
                      className={`${formik.touched.cases?.[index]?.phone && formik.errors.cases?.[index]?.phone ? 'border-red-500' : ''} p-2 py-1`}
                    />
                    {formik.touched.cases?.[index]?.phone && formik.errors.cases?.[index]?.phone && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].phone}</p>
                    )}
                  </div>

                  <div>
                    <div className='flex itmes-center justify-between'>
                      <label className="block mb-2">تصنيف الحالة</label>
                      <CategoryListFilter
                        setCategoryName={(item) => handleCaseCategorySelect(index, item)}
                        response={aidCategories}
                        isLoading={isLoadingCategories}
                        isError={isErrorCategories}
                        setPage={setCatPage}
                        setCatDebounceValue={setCatDebounceValue}
                        text={ 'اختر التصنيف'}
                        add={true}
                        addNewItem={addNewAidCategory}
                        addWait={addCategoryPending}
                        queryKey={'aidCategories'}
                      />
                      {formik.touched.cases?.[index]?.categoryIds && formik.errors.cases?.[index]?.categoryIds && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.cases[index].categoryIds}</p>
                      )}
                    </div>
                    {
                      caseCat[index]?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {caseCat[index]?.map((cat, catIndex) => (
                            <span key={catIndex} className="bg-secondary text-white px-3 py-1 rounded-full">
                              {cat}
                              <Trash2 size={12} className="inline-block ml-1 cursor-pointer mr-4"
                              onClick={()=> handleCaseCategoryRemove(index, catIndex)}
                              />
                            </span>
                          ))}
                        </div>
                      )
                    }
                    </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link to="/families">
              <Button type="button" variant="outline">إلغاء</Button>
            </Link>
            <Button type="submit" disabled={isPending} className="bg-secondary hover:bg-secondary">
              {isPending ? 'جاري إضافة العائلة...' : 'إضافة العائلة'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddFamily;