import { useFormik } from 'formik';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import CategoryListFilter from './CategoryListFilter';
import { useState } from 'react';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';
import { paySchema } from '@/constants/schemas/charityExpenseSchema';

const ConfirmPayModel = ({ children, message, wait, onConfirm, inventoryTypes,data }) => {

    const [inventoryType,setType]=useState();
    const [donationPurpose,setDonationPurpose]=useState('الغرض');
    const [page,setPage]=useState(1);
    const [debounce,setDebounce]=useState('');
    const {donationPursposes,isLoading,isError}=useGetAllDonationPurposes({
        pageNumber:page,
        SearchValue:debounce
    });


    const formik = useFormik({
        initialValues: {
            donationPurposeId: null,
            cashInventoryType: null,
            amount: data.amount || 0,
        },
        validationSchema: paySchema,
        onSubmit: (values) => {
            onConfirm(values);
        },
    });

    return (
        <Dialog dir="rtl">
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className={'text-lg'}>{message}</DialogTitle>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
                    <div className='flex items-center justify-between'>
                        <label htmlFor="cashInventoryType" className="block mb-2 text-lg">نوع الخزنة </label>
                        <DropdownMenu dir='rtl'>
                            <DropdownMenuTrigger render={<Button variant="outline"
                            className={" hover:text-secondary rounded-md text-secondary border-secondary border"}>
                                {inventoryType || 'الخزنه'}
                            </Button>} />
                            <DropdownMenuContent className="w-40" align="center" dir='rtl'>
                                <DropdownMenuGroup className={'flex flex-col gap-2 p-2 justify-center items-center w-full'}>
                                    {inventoryTypes.map((item,index)=>(
                                        <DropdownMenuItem key={index} className={'py-2 flex justify-center items-center cursor-pointer'}
                                        onClick={(e)=>{
                                            setType(item.name);
                                            formik.setFieldValue('cashInventoryType', item.id);
                                        }}>
                                            {item.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {formik.touched.cashInventoryType && formik.errors.cashInventoryType && (
                            <p className="text-red-500 text-lg mt-1">{formik.errors.cashInventoryType}</p>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <label htmlFor="donationPurposeId" className="block mb-2 text-lg">الغرض </label>
                        <CategoryListFilter
                            text={donationPurpose}
                            response={donationPursposes}
                            isError={isError}
                            isLoading={isLoading}
                            setPage={setPage}
                            setCatDebounceValue={setDebounce}
                            add={false}
                            setCategoryName={(item)=>{
                                setDonationPurpose(item.name);
                                formik.setFieldValue('donationPurposeId', item.id);
                            }}
                            
                        />
                        {formik.touched.donationPurposeId && formik.errors.donationPurposeId && (
                            <p className="text-red-500 text-lg mt-1">{formik.errors.donationPurposeId}</p>
                        )}
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <label htmlFor="amount" className="block mb-2 text-lg">المبلغ</label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0.01"
                            {...formik.getFieldProps('amount')}
                            className={`${formik.touched.amount && formik.errors.amount ? 'border-red-500' : ''} p-3 text-lg w-fit`}
                        />
                        {formik.touched.amount && formik.errors.amount && (
                            <p className="text-red-500 text-lg mt-1">{formik.errors.amount}</p>
                        )}
                    </div>
                    <DialogFooter className="flex items-center justify-between gap-4 mt-4">
                        <DialogClose render={<Button type="button" variant="outline" className="text-lg">إلغاء</Button>} />
                        <Button type="submit" disabled={wait} className="bg-secondary hover:bg-secondary text-lg">
                            {wait ? 'جاري السداد...' : 'سداد'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmPayModel