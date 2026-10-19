import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllProductCategories from '@/hooks/categories/products/useGetAllProductCategories';
import useGetAllProductUnits from '@/hooks/categories/productUnit/useGetAllProductUnits';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';
import useAddNewProductCategory from '@/hooks/categories/products/useAddNewProductCategory';
import useAddNewProductUnit from '@/hooks/categories/productUnit/useAddNewProductUnit';
import useAddNewDonationPurpose from '@/hooks/categories/donationPurpose/useAddNewDonationPurpose';
import { editFamiltRequiredItemSchema } from '@/constants/schemas/familySchema';
import useAddProductItem from '@/hooks/productItems/useAddProductItem';

const AddRequiredItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.state?.edit === true;
    const familyId = location.state?.familyId || null;
    const editItems = useMemo(() => location.state?.data || [], [location.state?.data]);

    const [productCatPage, setProductCatPage] = useState(1);
    const [productCatDebounceValue, setProductCatDebounceValue] = useState('');

    const [unitPage, setUnitPage] = useState(1);
    const [unitDebounceValue, setUnitDebounceValue] = useState('');

    const [purposePage, setPurposePage] = useState(1);
    const [purposeDebounceValue, setPurposeDebounceValue] = useState('');

    const { productCategories, isLoading: isLoadingProduct, isError: isErrorProduct } = useGetAllProductCategories({
        page: productCatPage,
        searchValue: productCatDebounceValue
    });

    const { productUnits, isLoading: isLoadingUnits, isError: isErrorUnits } = useGetAllProductUnits({
        page: unitPage,
        searchValue: unitDebounceValue
    });

    const { donationPursposes, isLoading: isLoadingPurposes, isError: isErrorPurposes } = useGetAllDonationPurposes({
        page: purposePage,
        searchValue: purposeDebounceValue
    });

    const { addNewProductCategory, isPending: addProductCategoryPending } = useAddNewProductCategory();
    const { addNewProductUnit, isPending: addUnitPending } = useAddNewProductUnit();
    const { addNewDonationPurpose, isPending: addPurposePending } = useAddNewDonationPurpose();



    const {addNewProductItem,isPending : addPending}=useAddProductItem();
    const {editProductItem,isPending : editPending}=useAddProductItem();

    const initialProductItem = useMemo(() => {
        return {
            categoryId: null,
            unitId: null,
            purposeId: null,
            amount: null,
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            familyRequiredItems: isEditMode && editItems.length > 0 ? editItems : [],
        },
        validationSchema: editFamiltRequiredItemSchema,
        onSubmit: (values) => {
            console.log(values)
            if(isEditMode) {

            }
            else {

            }
        },
    });


    const addProductItem = () => {
        formik.setFieldValue('familyRequiredItems', [...formik.values.familyRequiredItems, initialProductItem]);
    };

    const removeProductItem = (index) => {
        const newItems = formik.values.familyRequiredItems.filter((_, i) => i !== index);
        formik.setFieldValue('familyRequiredItems', newItems);
    };

    const handleProductCategorySelect = (index, item) => {
        formik.setFieldValue(`familyRequiredItems[${index}].categoryId`, item.id);
        formik.setFieldValue(`familyRequiredItems[${index}].itemName`, item.name);
    };

    const handleUnitSelect = (index, item) => {
        formik.setFieldValue(`familyRequiredItems[${index}].unitId`, item.id);
        formik.setFieldValue(`familyRequiredItems[${index}].unitName`, item.name);
    };

    const handlePurposeSelect = (index, item) => {
        formik.setFieldValue(`familyRequiredItems[${index}].purposeId`, item.id);
    };

    const headerText = isEditMode ? 'تعديل الأصناف المطلوبة' : 'إضافة أصناف مطلوبة';

    return (
        <Layout headerText={headerText}>
            <div className="container py-10 mb-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/families" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>

                <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
                    <div className="space-y-4 my-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">الأصناف المطلوبة</h3>
                            <Button type="button" variant="outline" onClick={addProductItem} className="gap-2">
                                <Plus size={16} /> إضافة صنف
                            </Button>
                        </div>

                        {formik.values.familyRequiredItems.map((item, index) => (
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    <div>
                                        <label className="block mb-2">الصنف</label>
                                        <CategoryListFilter
                                            setCategoryName={(selected) => handleProductCategorySelect(index, selected)}
                                            response={productCategories}
                                            isLoading={isLoadingProduct}
                                            isError={isErrorProduct}
                                            setPage={setProductCatPage}
                                            setCatDebounceValue={setProductCatDebounceValue}
                                            text={'اختر الصنف'}
                                            showAll={false}
                                            add={true}
                                            addNewItem={addNewProductCategory}
                                            addWait={addProductCategoryPending}
                                            queryKey={'productCategories'}
                                        />
                                        {formik.touched.familyRequiredItems?.[index]?.categoryId && formik.errors.familyRequiredItems?.[index]?.categoryId && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.familyRequiredItems[index].categoryId}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2">الوحدة</label>
                                        <CategoryListFilter
                                            setCategoryName={(selected) => handleUnitSelect(index, selected)}
                                            response={productUnits}
                                            isLoading={isLoadingUnits}
                                            isError={isErrorUnits}
                                            setPage={setUnitPage}
                                            setCatDebounceValue={setUnitDebounceValue}
                                            text={'اختر الوحدة'}
                                            showAll={false}
                                            add={true}
                                            addNewItem={addNewProductUnit}
                                            addWait={addUnitPending}
                                            queryKey={'productUnits'}
                                        />
                                        {formik.touched.familyRequiredItems?.[index]?.unitId && formik.errors.familyRequiredItems?.[index]?.unitId && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.familyRequiredItems[index].unitId}</p>
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
                                            text={'اختر الغرض'}
                                            showAll={false}
                                            add={true}
                                            addNewItem={addNewDonationPurpose}
                                            addWait={addPurposePending}
                                            queryKey={'donationPursposes'}
                                        />
                                        {formik.touched.familyRequiredItems?.[index]?.purposeId && formik.errors.familyRequiredItems?.[index]?.purposeId && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.familyRequiredItems[index].purposeId}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor={`amount-${index}`} className="block mb-2">الكمية *</label>
                                        <Input
                                            id={`amount-${index}`}
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            {...formik.getFieldProps(`familyRequiredItems[${index}].amount`)}
                                            className={`${formik.touched.familyRequiredItems?.[index]?.amount && formik.errors.familyRequiredItems?.[index]?.amount ? 'border-red-500 ' : ' '}
                                            p-2 py-1 bg-white`}
                                        />
                                        {formik.touched.familyRequiredItems?.[index]?.amount && formik.errors.familyRequiredItems?.[index]?.amount && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.familyRequiredItems[index].amount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                            إلغاء
                        </Button>
                        <Button type="submit" className="bg-secondary hover:bg-secondary">
                            {isEditMode ? 
                            editPending ? 'جاري التعديل...' : 'تعديل'
                        : addPending ? 'جاري الإضافة...' : 'إضافة'
                        }
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddRequiredItem;