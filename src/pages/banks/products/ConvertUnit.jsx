import Layout from '@/appComponents/layout/Layout'
import { useFormik } from 'formik'
import { convertUnitValidation } from '@/constants/schemas/schema'
import useGetProductItemById from '@/hooks/banks/products/useGetProductItemById'
import useConvertProductUnit from '@/hooks/banks/products/useConvertProductUnit'
import useGetAllProductUnits from '@/hooks/categories/productUnit/useGetAllProductUnits'
import useDeleteProductItem from '@/hooks/banks/products/useDeleteProductItem'
import CategoryListFilter from '@/components/customUI/CategoryListFilter'
import DeleteModel from '@/components/customUI/DeleteModel'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeftRight, Loader2, Trash2, Package } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import Error from '@/appComponents/models/Error'

const ConvertUnit = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [catPage, setCatPage] = useState(1)
    const [debounceValue, setDebounceValue] = useState('')

    const { productItem, isLoading: isProductLoading, isError: isProductError } = useGetProductItemById(id)
    const { convertProductUnit, isPending: isConvertPending } = useConvertProductUnit()
    const { deleteProductItem, isPending: isDeletePending } = useDeleteProductItem()
    const { productUnits, isLoading: isUnitsLoading, isError: isUnitsError } = useGetAllProductUnits({
        pageNumber: catPage,
        SearchValue : debounceValue
    })

    const handleDelete = () => {
        deleteProductItem(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['productItems'] })
                navigate('/banks/products')
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            targetUnitId: '',
            sourceAmount: '',
            targetAmount: ''
        },
        validationSchema: convertUnitValidation,
        onSubmit: (values) => {
            const payload = {
                id,
                data: values
            }
            console.log(payload)
            convertProductUnit(payload, {
                onSuccess: () => {
                    formik.resetForm()
                    queryClient.invalidateQueries({ queryKey: ['productItem'] })
                    queryClient.invalidateQueries({ queryKey: ['productItems'] })
                }
            })
        }
    })

    const handleProductUnitSelect = (unit) => {
        formik.setFieldValue('targetUnitId', unit.id)
    }

    return (
        <Layout headerText={'اداره المخازن'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-8 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                            تحويل وحدة المنتج
                        </h2>
                        <Link to="/banks/products" className="text-secondary hover:underline">
                            ← العودة للمنتجات
                        </Link>
                    </div>

                    {!isProductLoading && !isProductError && productItem && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
                                    <Package className="text-secondary" size={20} />
                                    تفاصيل المنتج
                                </h3>
                                <DeleteModel
                                    message="هل أنت متأكد من حذف هذا المنتج؟"
                                    wait={isDeletePending}
                                    deleteFun={handleDelete}
                                >
                                    <Trash2 size={16} className='text-red-500 cursor-pointer'/>
                                </DeleteModel>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-tertiary rounded-lg p-4 border border-secondary/20">
                                    <label className="block text-sm text-muted-foreground mb-1">الكمية الحالية</label>
                                    <p className="text-lg font-medium text-foreground">{productItem?.amount || 0}</p>
                                </div>
                                <div className="bg-tertiary rounded-lg p-4 border border-secondary/20">
                                    <label className="block text-sm text-muted-foreground mb-1">الوحدة الحالية</label>
                                    <p className="text-lg font-medium text-foreground">{productItem?.productItem?.unitName || '-'}</p>
                                </div>
                                <div className="bg-tertiary rounded-lg p-4 border border-secondary/20">
                                    <label className="block text-sm text-muted-foreground mb-1">الصنف</label>
                                    <p className="text-lg font-medium text-foreground">{productItem?.productItem?.categoryName || '-'}</p>
                                </div>
                                <div className="bg-tertiary rounded-lg p-4 border border-secondary/20">
                                    <label className="block text-sm text-muted-foreground mb-1">غرض التبرع</label>
                                    <p className="text-lg font-medium text-foreground">{productItem?.productItem?.purposeName || '-'}</p>
                                </div>
                                <div className="bg-tertiary rounded-lg p-4 border border-secondary/20 md:col-span-2">
                                    <label className="block text-sm text-muted-foreground mb-1">تاريخ الإنشاء</label>
                                    <p className="text-lg font-medium text-foreground">
                                        {productItem?.createdOn ? new Date(productItem.createdOn).toLocaleDateString('ar-EG') : '-'}
                                    </p>
                                </div>
                                <div className="bg-tertiary rounded-lg p-4 border border-secondary/20 md:col-span-2">
                                    <label className="block text-sm text-muted-foreground mb-1">تاريخ اخر تعديل</label>
                                    <p className="text-lg font-medium text-foreground">
                                        {productItem?.lastUpdated ? new Date(productItem.createdOn).toLocaleDateString('ar-EG') : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isProductLoading && (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="animate-spin text-secondary" size={32} />
                        </div>
                    )}

                    {isProductError && <Error/> }

                    {!isProductLoading && !isProductError && productItem && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2 mb-6">
                                <ArrowLeftRight className="text-secondary" size={20} />
                                تحويل الوحدة
                            </h3>
                            
                            <form onSubmit={formik.handleSubmit} className="space-y-6" dir="rtl">
                                <div>
                                    <label htmlFor="targetUnitId" className="block font-medium text-gray-700 mb-4">
                                        الوحدة الهدف <span className="text-red-500">*</span>
                                    </label>
                                    <CategoryListFilter
                                        text={'الوحده المطلوبه'}
                                        setCategoryName={handleProductUnitSelect}
                                        setCatDebounceValue={setDebounceValue}
                                        response={productUnits}
                                        isLoading={isUnitsLoading}
                                        isError={isUnitsError}
                                        setPage={setCatPage}
                                    />
                                    <input 
                                        type="hidden" 
                                        id="targetUnitId" 
                                        name="targetUnitId"
                                        value={formik.values.targetUnitId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.targetUnitId && formik.errors.targetUnitId && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.targetUnitId}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="sourceAmount" className="block font-medium text-gray-700 mb-1">
                                            الكمية المصدر <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="sourceAmount"
                                            name="sourceAmount"
                                            type="number"
                                            placeholder="أدخل الكمية المصدر"
                                            value={formik.values.sourceAmount}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.sourceAmount && formik.errors.sourceAmount ? 'border-red-500' : ''}
                                            disabled={isConvertPending}
                                            step="0.01"
                                            min="0.01"
                                        />
                                        {formik.touched.sourceAmount && formik.errors.sourceAmount && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.sourceAmount}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="targetAmount" className="block font-medium text-gray-700 mb-1">
                                            الكمية الهدف <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="targetAmount"
                                            name="targetAmount"
                                            type="number"
                                            placeholder="أدخل الكمية الهدف"
                                            value={formik.values.targetAmount}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.targetAmount && formik.errors.targetAmount ? 'border-red-500' : ''}
                                            disabled={isConvertPending}
                                            step="0.01"
                                            min="0.01"
                                        />
                                        {formik.touched.targetAmount && formik.errors.targetAmount && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.targetAmount}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                                    <Button 
                                        type="submit" 
                                        className="bg-secondary hover:bg-primary text-secondary-foreground"
                                        disabled={isConvertPending}
                                    >
                                        {isConvertPending ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="animate-spin" size={16} />
                                                جاري التحويل...
                                            </span>
                                        ) : (
                                            'تحويل الوحدة'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default ConvertUnit