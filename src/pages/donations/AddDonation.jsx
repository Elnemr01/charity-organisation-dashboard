import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllProductCategories from '@/hooks/categories/products/useGetAllProductCategories';
import useGetAllProductUnits from '@/hooks/categories/productUnit/useGetAllProductUnits';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';
import useGetAllDoners from '@/hooks/doners/useGetAllDoners';
import useAddDonation from '@/hooks/donations/useAddDonation';
import useAddNewProductCategory from '@/hooks/categories/products/useAddNewProductCategory';
import useAddNewProductUnit from '@/hooks/categories/productUnit/useAddNewProductUnit';
import useAddNewDonationPurpose from '@/hooks/categories/donationPurpose/useAddNewDonationPurpose';
import { moneyInventoryTypes } from '@/constants/banks/bankConst';
import toast from 'react-hot-toast';
import { addDonationValidate } from '@/utlis/addDonationValidateFun';
import { useQueryClient } from '@tanstack/react-query';
import useEditDonation from '@/hooks/donations/useEditDonation';


const AddDonation = () => {
    
    const [catPage, setCatPage] = useState(1);
    const [catDebounceValue, setCatDebounceValue] = useState('');

    const [unitPage, setUnitPage] = useState(1);
    const [unitDebounceValue, setUnitDebounceValue] = useState('');

    const [purposePage, setPurposePage] = useState(1);
    const [purposeDebounceValue, setPurposeDebounceValue] = useState('');

    const [donerPage, setDonerPage] = useState(1);
    const [donerDebounceValue, setDonerDebounceValue] = useState('');

    const { productCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAllProductCategories({
        page: catPage,
        searchValue: catDebounceValue
    });

    const { productUnits, isLoading: isLoadingUnits, isError: isErrorUnits } = useGetAllProductUnits({
        page: unitPage,
        searchValue: unitDebounceValue
    });

    const { donationPursposes, isLoading: isLoadingPurposes, isError: isErrorPurposes } = useGetAllDonationPurposes({
        page: purposePage,
        searchValue: purposeDebounceValue
    });

    const { doners, isLoading: isLoadingDoners, isError: isErrorDoners } = useGetAllDoners({
        pageNumber: donerPage,
        searchColumn: 'name',
        SearchValue: donerDebounceValue
    });

    const { addDonation,isPending } = useAddDonation();
    const { editDonation,isPending :editPending } = useEditDonation();
    const { addNewProductCategory, isPending: addCategoryPending } = useAddNewProductCategory();
    const { addNewProductUnit, isPending: addUnitPending } = useAddNewProductUnit();
    const { addNewDonationPurpose, isPending: addPurposePending } = useAddNewDonationPurpose();

    const queryClient=useQueryClient();
    const navigate=useNavigate();
    const location=useLocation();
    const edit=location.state?.edit;
    const data=location.state?.data;

    const [donationType, setDonationType] = useState(()=> {
        if(edit) {
            if(data?.donationProductItems?.length > 0 && data?.cashAmount) {
                return 'معا';
            }
            else if(data?.donationProductItems?.length > 0 && !data?.cashAmount) {
                return 'عينى';
            }
            else if( !data?.donationProductItems?.length && data?.cashAmount ) {
                return 'نقدى';
            }
        }
        return '';
    });



    const initialProductItem = useMemo(()=> {
        return {
            categoryId: null,
            unitId: null,
            donationPurposeId: null,
            amount: null,
        };
    },[])

    const formik = useFormik({
        initialValues: edit ? {
            donorId: data?.donorId || null,
            donationDeliverer: data?.donationDeliverer || null,
            receiptNumber: data?.receiptNumber || null,
            notes: data?.notes || null,
            donationProductItems: data?.donationProductItems || [],
            paymentMethod: data?.paymentMethod || null,
            cashAmount: data?.cashAmount || null,
            cashDonationPurposeId: data?.cashDonationPurposeId || null,
            cashInventoryType: data?.cashInventoryType || null,
        }:
        {
            donorId: null,
            donationDeliverer: null,
            receiptNumber: null,
            notes: null,
            donationProductItems: [],
            paymentMethod: null,
            cashAmount: null,
            cashDonationPurposeId: null,
            cashInventoryType: null,
        },
        validate: (values)=> addDonationValidate(values,donationType),
        onSubmit: (values) => {
            if((donationType === 'عينى' || donationType === 'معا') && values.donationProductItems.length === 0) {
                toast.error('برجاء إضافة محتويات التبرع العيني');
                return;
            }

            if(!donationType) {
                toast.error('يجب اختيار نوع التبرع وادخال البيانات');
                return;
            }


            if(edit) {
                editDonation({
                    id:data?.id,
                    data:{...values}
                }, {
                    onSuccess: () => {
                        resetData();
                    },
                });
            }
            else {
                addDonation(values, {
                    onSuccess: () => {
                        resetData();
                    },
                });
            }
        },
    });

    const resetData=()=> {
        navigate('/donations');
        queryClient.invalidateQueries({ queryKey: ['donations'] });
        formik.resetForm();
        if(donationType === 'عينى' ) {
            queryClient.invalidateQueries({ queryKey: ['productCategories'] });
        }
        else if(donationType === 'نقدى') {
            queryClient.invalidateQueries({ queryKey: ['cashInventories'] });
        }
        else if(donationType === 'معا') {
            queryClient.invalidateQueries({ queryKey: ['cashInventories'] });
            queryClient.invalidateQueries({ queryKey: ['productCategories'] });
        }
        
    }


    const addProductItem = () => {
        formik.setFieldValue('donationProductItems', [...formik.values.donationProductItems, initialProductItem]);
    };

    const removeProductItem = (index) => {
        const newItems = formik.values.donationProductItems.filter((_, i) => i !== index);
        formik.setFieldValue('donationProductItems', newItems);
    };

    const handleCategorySelect = (index, item) => {
        formik.setFieldValue(`donationProductItems[${index}].categoryId`, item.id);
    };

    const handleUnitSelect = (index, item) => {
        formik.setFieldValue(`donationProductItems[${index}].unitId`, item.id);
    };

    const handlePurposeSelect = (index, item) => {
        formik.setFieldValue(`donationProductItems[${index}].donationPurposeId`, item.id);
    };

    const handleCashPurposeSelect = (item) => {
        formik.setFieldValue('cashDonationPurposeId', item.id);
    };

    const handleSelectDonor = (item) => {
        formik.setFieldValue('donorId', item.id);
    }

    
    return (
        <Layout headerText={edit ? 'تعديل التبرع' : 'إضافة تبرع جديد'}>
            <div className="container py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/donations" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>

                <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="donorId" className="block mb-2">اسم المتبرع *</label>
                            <CategoryListFilter
                                setCategoryName={handleSelectDonor}
                                response={doners}
                                isLoading={isLoadingDoners}
                                isError={isErrorDoners}
                                setPage={setDonerPage}
                                setCatDebounceValue={setDonerDebounceValue}
                                text={edit ? data?.donorName : 'اختر المتبرع'}
                            />
                            {formik.touched.donorId && formik.errors.donorId && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.donorId}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="donationDeliverer" className="block mb-2">مقدم التبرع *</label>
                            <Input
                                id="donationDeliverer"
                                {...formik.getFieldProps('donationDeliverer')}
                                className={`${formik.touched.donationDeliverer && formik.errors.donationDeliverer ? 'border-red-500' : ''} p-2 py-1`}
                            />
                            {formik.touched.donationDeliverer && formik.errors.donationDeliverer && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.donationDeliverer}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="receiptNumber" className="block mb-2">رقم الإيصال *</label>
                            <Input
                                id="receiptNumber"
                                {...formik.getFieldProps('receiptNumber')}
                                className={`${formik.touched.receiptNumber && formik.errors.receiptNumber ? 'border-red-500' : ''} p-2 py-1`}
                            />
                            {formik.touched.receiptNumber && formik.errors.receiptNumber && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.receiptNumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="donationType" className="block mb-2">نوع التبرع *</label>
                            <select
                                id="donationType"
                                value={donationType}
                                onChange={(e) => setDonationType(e.target.value)}
                                className="w-full p border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            >
                                <option value="">اختر نوع التبرع</option>
                                <option value="عينى">عينى</option>
                                <option value="نقدى">نقدى</option>
                                <option value="معا">نقدى و عينى</option>
                            </select>
                        </div>
                    </div>

                    {(donationType === 'عينى' || donationType === 'معا') && (
                        <div className="space-y-4 my-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold"> محتويات التبرع العيني </h3>
                                <Button type="button" variant="outline" onClick={addProductItem} className="gap-2">
                                    <Plus size={16} /> إضافة صنف
                                </Button>
                            </div>

                            {formik.values.donationProductItems.map((item, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">صنف #{index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeProductItem(index)}
                                                className="text-red-500 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block mb-2">الصنف *</label>
                                            <CategoryListFilter
                                                setCategoryName={(selected) => handleCategorySelect(index, selected)}
                                                response={productCategories}
                                                isLoading={isLoadingCategories}
                                                isError={isErrorCategories}
                                                setPage={setCatPage}
                                                showAll={false}
                                                setCatDebounceValue={setCatDebounceValue}
                                                text={edit ? formik.values.donationProductItems?.[index]?.categoryName : 'اختر الصنف'}
                                                add={true}
                                                addNewItem={addNewProductCategory}
                                                addWait={addCategoryPending}
                                                queryKey={'productCategories'}
                                            />
                                            {formik.touched.donationProductItems?.[index]?.categoryId && formik.errors.donationProductItems?.[index]?.categoryId && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.donationProductItems[index].categoryId}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2">الوحدة *</label>
                                            <CategoryListFilter
                                                setCategoryName={(selected) => handleUnitSelect(index, selected)}
                                                response={productUnits}
                                                isLoading={isLoadingUnits}
                                                isError={isErrorUnits}
                                                setPage={setUnitPage}
                                                showAll={false}
                                                setCatDebounceValue={setUnitDebounceValue}
                                                text={edit ? formik.values.donationProductItems?.[index]?.unitName : 'اختر الوحدة'}
                                                add={true}
                                                addNewItem={addNewProductUnit}
                                                addWait={addUnitPending}
                                                queryKey={'productUnits'}
                                            />
                                            {formik.touched.donationProductItems?.[index]?.unitId && formik.errors.donationProductItems?.[index]?.unitId && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.donationProductItems[index].unitId}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2">الغرض *</label>
                                            <CategoryListFilter
                                                setCategoryName={(selected) => handlePurposeSelect(index, selected)}
                                                response={donationPursposes}
                                                isLoading={isLoadingPurposes}
                                                isError={isErrorPurposes}
                                                setPage={setPurposePage}
                                                showAll={false}
                                                setCatDebounceValue={setPurposeDebounceValue}
                                                text={edit ? 
                                                    formik.values.donationProductItems?.[index]?.donationPurposeName 
                                                    :
                                                    'اختر الغرض'}
                                                add={true}
                                                addNewItem={addNewDonationPurpose}
                                                addWait={addPurposePending}
                                                queryKey={'donationPursposes'}
                                            />
                                            {formik.touched.donationProductItems?.[index]?.donationPurposeId && formik.errors.donationProductItems?.[index]?.donationPurposeId && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.donationProductItems[index].donationPurposeId}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor={`amount-${index}`} className="block mb-2">الكمية *</label>
                                            <Input
                                                id={`amount-${index}`}
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                {...formik.getFieldProps(`donationProductItems[${index}].amount`)}
                                                className={`${formik.touched.donationProductItems?.[index]?.amount && formik.errors.donationProductItems?.[index]?.amount ? 'border-red-500 ' : ' '}
                                                p-2 py-1 bg-white`}
                                            />
                                            {formik.touched.donationProductItems?.[index]?.amount && formik.errors.donationProductItems?.[index]?.amount && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.donationProductItems[index].amount}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                                
                        </div>
                    )}

                    {/* money donation */}

                    {(donationType === 'نقدى' || donationType === 'معا') && (
                        <div className="space-y-4 border-t pt-6 mt-8">
                            <h3 className="text-lg font-semibold">بيانات التبرع النقدي</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <label htmlFor="paymentMethod" className="block mb-2">طريقة الدفع *</label>
                                    <input
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        type="text"
                                        value={formik.values.paymentMethod}
                                        onChange={formik.handleChange}
                                        className={`w-full border  rounded-md focus:outline-none p-2 py-1
                                            ${formik.touched.paymentMethod && formik.errors.paymentMethod ? 'border-red-500 ' : ' border-gray-300'}`}
                                    />
                                        
                                    {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.paymentMethod}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="cashAmount" className="block mb-2">المبلغ *</label>
                                    <Input
                                        id="cashAmount"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        {...formik.getFieldProps('cashAmount')}
                                        className={`${formik.touched.cashAmount && formik.errors.cashAmount ? 'border-red-500' : ''} p-2 py-1`}
                                    />
                                    {formik.touched.cashAmount && formik.errors.cashAmount && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.cashAmount}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2">غرض التبرع النقدي *</label>
                                    <CategoryListFilter
                                        setCategoryName={handleCashPurposeSelect}
                                        response={donationPursposes}
                                        isLoading={isLoadingPurposes}
                                        isError={isErrorPurposes}
                                        setPage={setPurposePage}
                                        setCatDebounceValue={setPurposeDebounceValue}
                                        text={edit ? data?.cashDonationPurposeName : 'اختر الغرض'}
                                        add={true}
                                        addNewItem={addNewDonationPurpose}
                                        addWait={addPurposePending}
                                        queryKey={'donationPursposes'}
                                    />
                                    {formik.touched.cashDonationPurposeId && formik.errors.cashDonationPurposeId && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.cashDonationPurposeId}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2">نوع الخزنة *</label>
                                    <select
                                        {...formik.getFieldProps('cashInventoryType')}
                                        className={`w-full  border border-gray-300 rounded-md focus:outline-none `}
                                    >
                                        <option value="">اختر نوع الخزنة</option>
                                        {moneyInventoryTypes.map((type) => (
                                            <option key={type.id} value={type.id} >
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.cashInventoryType && formik.errors.cashInventoryType && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.cashInventoryType}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label htmlFor="notes" className="block mb-2">ملاحظات</label>
                        <textarea
                            id="notes"
                            rows={3}
                            {...formik.getFieldProps('notes')}
                            placeholder='ملاحظات عن عمليه التبرع'
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <Link to="/donations">
                            <Button type="button" variant="outline">إلغاء</Button>
                        </Link>
                        <Button type="submit" disabled={isPending || editPending} className="bg-secondary hover:bg-secondary">
                            {edit ? (editPending ? 'جاري تعديل التبرع...' : 'تعديل التبرع') : (isPending ? 'جاري إضافة التبرع...' : 'إضافة التبرع')}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddDonation;