import Layout from '@/appComponents/layout/Layout'
import { useFormik } from 'formik'
import { transferValidation } from '@/constants/schemas/schema'
import { moneyInventoryTypes } from '@/constants/banks/bankConst'
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes'
import useTransferCashInventory from '@/hooks/banks/money/useTransferCashInventory'
import CategoryListFilter from '@/components/customUI/CategoryListFilter'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeftRight, Banknote, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import useAddNewDonationPurpose from '@/hooks/categories/donationPurpose/useAddNewDonationPurpose'

const Transfer = () => {
    const [sourceCatPage, setSourceCatPage] = useState(1)
    const [targetCatPage, setTargetCatPage] = useState(1)
    const [sourceDebounceValue, setSourceDebounceValue] = useState('')
    const [targetDebounceValue, setTargetDebounceValue] = useState('')
    const [, setSourceCategoryName] = useState(null)
    const [, setTargetCategoryName] = useState(null)
    const navigate = useNavigate()

    const { donationPursposes: sourceDonationPurposes, isLoading: isSourceLoading, isError: isSourceError } = useGetAllDonationPurposes({
        page: sourceCatPage,
        searchValue: sourceDebounceValue
    })

    const { donationPursposes: targetDonationPurposes, isLoading: isTargetLoading, isError: isTargetError } = useGetAllDonationPurposes({
        page: targetCatPage,
        searchValue: targetDebounceValue
    })

    const {addNewDonationPurpose,isPending:addIsPending}=useAddNewDonationPurpose();

    const { transferCashInventory, isPending } = useTransferCashInventory()

    const inventoryTypes = useMemo(() => moneyInventoryTypes, [])
    const queryClient =useQueryClient();
    const formik = useFormik({
        initialValues: {
            sourceInventoryType: '',
            sourcePurposeId: '',
            targetInventoryType: '',
            targetPurposeId: '',
            amount: ''
        },
        validationSchema: transferValidation,
        onSubmit: (values) => {
            console.log(values)
            const payload = {
                data: values
            }
            transferCashInventory(payload, {
                onSuccess: () => {
                    formik.resetForm();
                    navigate('/banks/money');
                    queryClient.invalidateQueries({ queryKey: ['cashInventories'] });
                }
            })
        }
    })

    const handleSourceInventoryChange = (value) => {
        formik.setFieldValue('sourceInventoryType', value)
    }

    const handleTargetInventoryChange = (value) => {
        formik.setFieldValue('targetInventoryType', value)
    }

    const handleSourcePurposeChange = (value) => {
        formik.setFieldValue('sourcePurposeId', value.id)
    }

    const handleTargetPurposeChange = (value) => {
        formik.setFieldValue('targetPurposeId', value.id)
    }

    return (
        <Layout headerText={'اداره المخازن'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-8 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                            تحويل بين الخزن النقديه
                        </h2>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={formik.handleSubmit} className="space-y-6" dir="rtl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4 pl-0">
                                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                                        <Banknote className="text-primary" size={20} />
                                        تحويل من 
                                    </h3>
                                    
                                    <div>
                                        <label htmlFor="sourceInventoryType" className="block text-sm font-medium text-gray-700 mb-1">
                                            نوع الخزنه <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="sourceInventoryType"
                                            name="sourceInventoryType"
                                            value={formik.values.sourceInventoryType}
                                            onChange={(e) => handleSourceInventoryChange(e.target.value)}
                                            onBlur={formik.handleBlur}
                                            disabled={isPending}
                                            className={`w-full rounded-lg border px-2.5 py-1 text-base transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 ${formik.touched.sourceInventoryType && formik.errors.sourceInventoryType ? 'border-red-500' : 'border-input bg-transparent'}`}
                                        >
                                            <option value="">اختر نوع الخزنه</option>
                                            {inventoryTypes.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.sourceInventoryType && formik.errors.sourceInventoryType && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.sourceInventoryType}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="sourcePurposeId" className="block font-medium text-gray-700 mb-4">
                                            غرض التبرع <span className="text-red-500">*</span>
                                        </label>
                                        <CategoryListFilter
                                            text={'الغرض'}
                                            setCategoryName={handleSourcePurposeChange}
                                            setCatDebounceValue={setSourceDebounceValue}
                                            response={sourceDonationPurposes}
                                            isLoading={isSourceLoading}
                                            isError={isSourceError}
                                            setPage={setSourceCatPage}
                                        />
                                        <input 
                                            type="hidden" 
                                            id="sourcePurposeId" 
                                            name="sourcePurposeId"
                                            value={formik.values.sourcePurposeId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.sourcePurposeId && formik.errors.sourcePurposeId && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.sourcePurposeId}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 pr-0">
                                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                                        <Banknote className="text-primary" size={20} />
                                        تحويل الى 
                                    </h3>
                                    
                                    <div>
                                        <label htmlFor="targetInventoryType" className="block font-medium text-gray-700 mb-1">
                                            نوع الخزنه <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="targetInventoryType"
                                            name="targetInventoryType"
                                            value={formik.values.targetInventoryType}
                                            onChange={(e) => handleTargetInventoryChange(e.target.value)}
                                            onBlur={formik.handleBlur}
                                            disabled={isPending}
                                            className={`w-full rounded-lg border px-2.5 py-1 text-base transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 ${formik.touched.targetInventoryType && formik.errors.targetInventoryType ? 'border-red-500' : 'border-input bg-transparent'}`}
                                        >
                                            <option value="">اختر نوع الخزنه</option>
                                            {inventoryTypes.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.targetInventoryType && formik.errors.targetInventoryType && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.targetInventoryType}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="targetPurposeId" className="block font-medium text-gray-700 mb-4">
                                            غرض التبرع <span className="text-red-500">*</span>
                                        </label>
                                        <CategoryListFilter
                                            text={'الغرض'}
                                            setCategoryName={handleTargetPurposeChange}
                                            setCatDebounceValue={setTargetDebounceValue}
                                            response={targetDonationPurposes}
                                            isLoading={isTargetLoading}
                                            isError={isTargetError}
                                            setPage={setTargetCatPage}
                                            add={true}
                                            addNewItem={addNewDonationPurpose}
                                            queryKey="donationPursposes"
                                            addWait={addIsPending}
                                        />
                                        <input 
                                            type="hidden" 
                                            id="targetPurposeId" 
                                            name="targetPurposeId"
                                            value={formik.values.targetPurposeId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.targetPurposeId && formik.errors.targetPurposeId && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.targetPurposeId}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <div>
                                    <label htmlFor="amount" className="block font-medium text-gray-700 mb-1">
                                        المبلغ <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        placeholder="أدخل المبلغ"
                                        value={formik.values.amount}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`${formik.touched.amount && formik.errors.amount ? 'border-red-500' : ''}`}
                                        disabled={isPending}
                                        step="0.01"
                                        min="1"
                                    />
                                    {formik.touched.amount && formik.errors.amount && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.amount}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Button 
                                    type="submit" 
                                    className="bg-primary hover:bg-secondary text-primary-foreground"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" size={16} />
                                            جاري التحويل...
                                        </span>
                                    ) : (
                                        'تحويل'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Transfer