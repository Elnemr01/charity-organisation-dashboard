import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { donationSchema } from '@/constants/schemas/donationSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllProductCategories from '@/hooks/categories/products/useGetAllProductCategories';
import useGetAllProductUnits from '@/hooks/categories/productUnit/useGetAllProductUnits';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';
import useGetAllDoners from '@/hooks/doners/useGetAllDoners';
import useAddDonation from '@/hooks/donations/useAddDonation';
import { moneyInventoryTypes, moneyInventoryStyle } from '@/constants/banks/bankConst';
import toast from 'react-hot-toast';

const AddDonation = () => {
    const navigate = useNavigate();
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
        SearchValue: donerDebounceValue
    });

    const { addDonation, isPending } = useAddDonation();

    const initialProductItem = {
        categoryId: '',
        unitId: '',
        purposeId: '',
        amount: '',
    };

    const formik = useFormik({
        initialValues: {
            donorId: '',
            donationDeliverer: '',
            receiptNumber: '',
            notes: '',
            donationType: 'عينى',
            productItems: [initialProductItem],
            paymentMethod: 'Cash',
            cashAmount: '',
            cashDonationPurposeId: '',
            cashInventoryType: 'Charity',
        },
        validationSchema: donationSchema,
        onSubmit: (values) => {
            const submitData = {
                donorId: Number(values.donorId),
                donationDeliverer: values.donationDeliverer,
                receiptNumber: values.receiptNumber,
                notes: values.notes,
            };

            if (values.donationType === 'عينى') {
                submitData.productItems = values.productItems.map(item => ({
                    categoryId: Number(item.categoryId),
                    unitId: Number(item.unitId),
                    purposeId: Number(item.purposeId),
                    amount: Number(item.amount),
                }));
            } else {
                submitData.paymentMethod = values.paymentMethod;
                submitData.cashAmount = Number(values.cashAmount);
                submitData.cashDonationPurposeId = Number(values.cashDonationPurposeId);
                submitData.cashInventoryType = values.cashInventoryType;
            }

            addDonation(submitData, {
                onSuccess: () => {
                    toast.success('تم إضافة التبرع بنجاح');
                    navigate('/donations');
                },
                onError: () => {
                    toast.error('حدث خطأ برجاء المحاولة لاحقا');
                }
            });
        },
    });

    const addProductItem = () => {
        formik.setFieldValue('productItems', [...formik.values.productItems, initialProductItem]);
    };

    const removeProductItem = (index) => {
        const newItems = formik.values.productItems.filter((_, i) => i !== index);
        formik.setFieldValue('productItems', newItems);
    };

    const handleCategorySelect = (index, item) => {
        formik.setFieldValue(`productItems[${index}].categoryId`, item.id);
        formik.setFieldValue(`productItems[${index}].categoryName`, item.name);
    };

    const handleUnitSelect = (index, item) => {
        formik.setFieldValue(`productItems[${index}].unitId`, item.id);
        formik.setFieldValue(`productItems[${index}].unitName`, item.name);
    };

    const handlePurposeSelect = (index, item) => {
        formik.setFieldValue(`productItems[${index}].purposeId`, item.id);
        formik.setFieldValue(`productItems[${index}].purposeName`, item.name);
    };

    const handleCashPurposeSelect = (item) => {
        formik.setFieldValue('cashDonationPurposeId', item.id);
        formik.setFieldValue('cashDonationPurposeName', item.name);
    };

    return (
        <Layout headerText={'إضافة تبرع جديد'}>
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
                            <div className="mb-2">
                                <Input
                                    id="donerSearch"
                                    type="text"
                                    placeholder="ابحث عن متبرع..."
                                    value={donerDebounceValue}
                                    onChange={(e) => {
                                        setDonerDebounceValue(e.target.value);
                                        setDonerPage(1);
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>
                            <select
                                id="donorId"
                                {...formik.getFieldProps('donorId')}
                                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${formik.touched.donorId && formik.errors.donorId ? 'border-red-500' : ''}`}
                                disabled={isLoadingDoners}
                            >
                                <option value="">اختر المتبرع</option>
                                {isLoadingDoners && <option disabled>جاري التحميل...</option>}
                                {isErrorDoners && <option disabled>خطأ في تحميل المتبرعين</option>}
                                {!isLoadingDoners && !isErrorDoners && doners?.items?.map((doner) => (
                                    <option key={doner.id} value={doner.id}>
                                        {doner.name} - {doner.phone}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.donorId && formik.errors.donorId && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.donorId}</p>
                            )}
                            {!isLoadingDoners && !isErrorDoners && doners && (
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-500">
                                        صفحة {donerPage} من {doners.totalPages || 1} - إجمالي {doners.totalItems || 0} متبرع
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDonerPage(p => Math.max(1, p - 1))}
                                            disabled={donerPage <= 1 || isLoadingDoners}
                                        >
                                            السابق
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDonerPage(p => p + 1)}
                                            disabled={donerPage >= (doners.totalPages || 1) || isLoadingDoners}
                                        >
                                            التالي
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="donationDeliverer" className="block mb-2">مقدم التبرع *</label>
                            <Input
                                id="donationDeliverer"
                                {...formik.getFieldProps('donationDeliverer')}
                                className={formik.touched.donationDeliverer && formik.errors.donationDeliverer ? 'border-red-500' : ''}
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
                                className={formik.touched.receiptNumber && formik.errors.receiptNumber ? 'border-red-500' : ''}
                            />
                            {formik.touched.receiptNumber && formik.errors.receiptNumber && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.receiptNumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="donationType" className="block mb-2">نوع التبرع *</label>
                            <select
                                id="donationType"
                                {...formik.getFieldProps('donationType')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            >
                                <option value="">اختر نوع التبرع</option>
                                <option value="عينى">عينى</option>
                                <option value="نقدى">نقدى</option>
                            </select>
                            {formik.touched.donationType && formik.errors.donationType && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.donationType}</p>
                            )}
                        </div>
                    </div>

                    {formik.values.donationType === 'عينى' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">صناعات التبرع العيني</h3>
                                <Button type="button" variant="outline" onClick={addProductItem} className="gap-2">
                                    <Plus size={16} /> إضافة صنف
                                </Button>
                            </div>

                            {formik.values.productItems.map((item, index) => (
                                <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">صنف #{index + 1}</h4>
                                        {formik.values.productItems.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeProductItem(index)}
                                                className="text-red-500 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2">الصنف *</label>
                                            <CategoryListFilter
                                                setCategoryName={(selected) => handleCategorySelect(index, selected)}
                                                response={productCategories}
                                                isLoading={isLoadingCategories}
                                                isError={isErrorCategories}
                                                setPage={setCatPage}
                                                setCatDebounceValue={setCatDebounceValue}
                                                text="اختر الصنف"
                                            />
                                            {formik.touched.productItems?.[index]?.categoryId && formik.errors.productItems?.[index]?.categoryId && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.productItems[index].categoryId}</p>
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
                                                setCatDebounceValue={setUnitDebounceValue}
                                                text="اختر الوحدة"
                                            />
                                            {formik.touched.productItems?.[index]?.unitId && formik.errors.productItems?.[index]?.unitId && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.productItems[index].unitId}</p>
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
                                                setCatDebounceValue={setPurposeDebounceValue}
                                                text="اختر الغرض"
                                            />
                                            {formik.touched.productItems?.[index]?.purposeId && formik.errors.productItems?.[index]?.purposeId && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.productItems[index].purposeId}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor={`amount-${index}`} className="block mb-2">الكمية *</label>
                                            <Input
                                                id={`amount-${index}`}
                                                type="number"
                                                step="0.01"
                                                min="0.01"
                                                {...formik.getFieldProps(`productItems[${index}].amount`)}
                                                className={formik.touched.productItems?.[index]?.amount && formik.errors.productItems?.[index]?.amount ? 'border-red-500' : ''}
                                            />
                                            {formik.touched.productItems?.[index]?.amount && formik.errors.productItems?.[index]?.amount && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.productItems[index].amount}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {formik.values.donationType === 'نقدى' && (
                        <div className="space-y-4 border-t pt-6">
                            <h3 className="text-lg font-semibold">بيانات التبرع النقدي</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="paymentMethod" className="block mb-2">طريقة الدفع *</label>
                                    <select
                                        id="paymentMethod"
                                        {...formik.getFieldProps('paymentMethod')}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                    >
                                        <option value="">اختر طريقة الدفع</option>
                                        <option value="Cash">نقدي</option>
                                        <option value="Transfer">تحويل بنكي</option>
                                        <option value="Check">شيك</option>
                                    </select>
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
                                        className={formik.touched.cashAmount && formik.errors.cashAmount ? 'border-red-500' : ''}
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
                                        text="اختر الغرض"
                                    />
                                    {formik.touched.cashDonationPurposeId && formik.errors.cashDonationPurposeId && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.cashDonationPurposeId}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2">نوع الخزنة *</label>
                                    <select
                                        {...formik.getFieldProps('cashInventoryType')}
                                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${moneyInventoryStyle[formik.values.cashInventoryType] || ''}`}
                                    >
                                        <option value="">اختر نوع الخزنة</option>
                                        {moneyInventoryTypes.map((type) => (
                                            <option key={type.id} value={type.id} className={moneyInventoryStyle[type.id]}>
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
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <Link to="/donations">
                            <Button type="button" variant="outline">إلغاء</Button>
                        </Link>
                        <Button type="submit" disabled={isPending} className="bg-secondary hover:bg-secondary">
                            {isPending ? 'جاري الإضافة...' : 'حفظ التبرع'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddDonation;