import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllAidCategories from '@/hooks/categories/aid/useGetAllAidCategories';
import useAddFamily from '@/hooks/families/useAddFamily';
import useAddNewAidCategory from '@/hooks/categories/aid/useAddNewAidCategory';
import { editFamilySchema } from '@/constants/schemas/familySchema';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { familyDecision, familyStatusOptions } from '@/constants/families/familyConst';
import FilterVals from '@/components/customUI/FilterVals';
import useEditFamily from '@/hooks/families/useEditFamily';
import useGetAllCases from '@/hooks/cases/useGetAllCases';
import Loading from '@/appComponents/models/Loading';
import Error from '@/appComponents/models/Error';

const EditFamilyInfo = () => {

    const [catPage, setCatPage] = useState(1);
    const [catDebounceValue, setCatDebounceValue] = useState('');

    const { aidCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAllAidCategories({
        page: catPage,
        searchValue: catDebounceValue,
    });
    const { mutate: addNewAidCategory, isPending: addCategoryPending } = useAddNewAidCategory();

    
    const location=useLocation();
    const data=location?.state?.data
    
    const [familyCat,setFamilyCat] = useState(()=> data ? data?.categories?.map((cat)=> cat.name) : []);

    const { editFamily, isPending } = useEditFamily();
    const {cases ,isLoading: isLoadingCases, isError: isErrorCases} = useGetAllCases({
        familyId:data?.id
    });


    const familyStatusOptionsArr=useMemo(()=>familyStatusOptions,[]);
    const familyDecisionObj=useMemo(()=>{return familyDecision},[]);
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
            primaryReceiverId: data?.primaryReceiverId || null,
            region: data?.region || '',
            address: data?.address || '',
            cashRequired: data?.cashRequired || 0,
            decision: data?.decision || '',
            decisionReason:data?.decisionReason || '',
            categoryIds: data?.categories.filter((cat) => cat.id).map((cat) => cat.id) || [],
            },
            validationSchema: editFamilySchema,
            onSubmit: (values) => {
            
                editFamily({
                    id:data.id,
                    data:values
                }, {
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

        // Handle family category selection
        const handleCategorySelect = (item) => {
            formik.setFieldValue('categoryIds', [...formik.values.categoryIds, item.id]);
            setFamilyCat((old)=> [...old, item.name]);
        };

        const handleCategoryRemove = (i) => {
            formik.setFieldValue('categoryIds', formik.values.categoryIds.filter((_, index) => index !== i));
            setFamilyCat((old)=> old.filter((_, index) => index !== i));
    };

    return (
        <Layout headerText={'اداره العائلات'}>
            <div className="container py-10 mb-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/families" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>
                {/* edit family form */}
                <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="primaryReceiverId" className="block mb-2">اسم المستفيد </label>
                        <select name="primaryReceiverId"
                        className={`w-full border rounded-md
                            ${formik.touched.primaryReceiverId && formik.errors.primaryReceiverId ? 'border-red-500' : ''} `}
                            id="primaryReceiverId">
                            {
                                isLoadingCases ?

                                <div className='h-20 flex items-center justify-center'>
                                    <Loading/>
                                </div>
                                :
                                isErrorCases ?
                                <div className='flex items-center justify-center h-20'>
                                    <Error/>
                                </div>
                                :
                                cases?.items?.map((item,i)=> 
                                    <option key={i} value={item.id}>{item?.name}</option>
                                )
                            }
                        </select>
                        {/* <Input
                        id="primaryReceiverId"
                        {...formik.getFieldProps('primaryReceiverId')}
                        value={data?.primaryReceiverName || ''}
                        className={`${formik.touched.primaryReceiverId && formik.errors.primaryReceiverId ? 'border-red-500' : ''} p-2 py-1`}
                        /> */}
                        {formik.touched.primaryReceiverId && formik.errors.primaryReceiverId && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.primaryReceiverId}</p>
                        )}
                    </div>

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
                    </div>
                    <div>
                        <div className='flex flex-col gap-2'>
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
                        </div>
                        {formik.touched.categoryIds && formik.errors.categoryIds && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.categoryIds}</p>
                        )}
                        </div>
                        {
                            familyCat?.length > 0 && (
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
                        text={familyDecisionObj[formik.values.decision]|| 'اختر القرار'}
                        setFilter={(item)=>formik.setFieldValue('decision',item.id)}
                        />
                    </div>
                
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="decisionReason">اسباب الرفض او القبول (ملاحظات)</label>
                        <textarea name="decisionReason"
                        value={formik.values.decisionReason}
                        onChange={formik.handleChange}
                        id="decisionReason"
                        className="p-2 border rounded-md h-30"
                        placeholder='اسباب الرفض او القبول (ملاحظات)'
                        >
            
                        </textarea>
                    </div>
                
                
                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <Link to="/families">
                        <Button type="button" variant="outline">إلغاء</Button>
                        </Link>
                        <Button type="submit" disabled={isPending} className="bg-secondary hover:bg-secondary">
                        {isPending ? 'جاري تعديل العائلة...' : 'تعديل العائلة'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default EditFamilyInfo