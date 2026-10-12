import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import useAddCharityExpense from '@/hooks/charityExpense/useAddCharityExpense';
import useEditCharityExpense from '@/hooks/charityExpense/useEditCharityExpense';
import { charityExpenseSchema } from '@/constants/schemas/charityExpenseSchema';
import { useQueryClient } from '@tanstack/react-query';

const AddCharityExpense = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;
    const edit = location.state?.edit;
    const queryClient = useQueryClient();
    const { addCharityExpense, isPending } = useAddCharityExpense();
    const { editCharityExpense, isPending: editPending } = useEditCharityExpense();

    const formik = useFormik({
        initialValues: edit && data ? {
            name: data.name || '',
            amount: data.amount || '',
            notes: data.notes || '',
        } : {
            name: '',
            amount: '',
            notes: '',
        },
        validationSchema: charityExpenseSchema,
        onSubmit: (values) => {
            if (edit && data) {
                editCharityExpense({
                    id: data.id,
                    data: {
                        name: values.name,
                        amount: values.amount,
                        notes: values.notes,
                    }
                }, {
                    onSuccess: () => {
                        navigate('/charity-expense');
                        queryClient.invalidateQueries({ queryKey: ['charityExpenses'] });
                        formik.resetForm();
                    },
                });
            } else {
                addCharityExpense({
                    name: values.name,
                    amount: values.amount,
                    notes: values.notes,
                }, {
                    onSuccess: () => {
                        navigate('/charity-expense');
                        queryClient.invalidateQueries({ queryKey: ['charityExpenses'] });
                        formik.resetForm();
                    },
                });
            }
        },
    });

    return (
        <Layout headerText={edit ? 'تعديل مصروف الجمعية' : 'إضافة مصروف جديد للجمعية'}>
            <div className="container py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/charity-expense" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>

                <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-lg">اسم المصروف *</label>
                            <Input
                                id="name"
                                {...formik.getFieldProps('name')}
                                className={`${formik.touched.name && formik.errors.name ? 'border-red-500' : ''} p-3 text-lg`}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-lg mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="amount" className="block mb-2 text-lg">المبلغ *</label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                {...formik.getFieldProps('amount')}
                                className={`${formik.touched.amount && formik.errors.amount ? 'border-red-500' : ''} p-3 text-lg`}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                                <p className="text-red-500 text-lg mt-1">{formik.errors.amount}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block mb-2 text-lg">الملاحظات *</label>
                        <textarea
                            id="notes"
                            rows={4}
                            {...formik.getFieldProps('notes')}
                            placeholder='ملاحظات عن المصروف'
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-lg
                                ${formik.touched.notes && formik.errors.notes ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.touched.notes && formik.errors.notes && (
                            <p className="text-red-500 text-lg mt-1">{formik.errors.notes}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <Link to="/charity-expense">
                            <Button type="button" variant="outline" className="text-lg">إلغاء</Button>
                        </Link>
                        <Button type="submit" disabled={isPending || editPending} className="bg-secondary hover:bg-secondary text-lg">
                            {(edit ? editPending : isPending) ? 'جاري الحفظ...' : 'حفظ'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddCharityExpense;