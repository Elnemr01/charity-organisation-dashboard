import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import useEditFamilyExpense from '@/hooks/familyExpense/useEditFamilyExpense';
import { familyExpenseSchema } from '@/constants/schemas/familyExpenseSchema';
import { useQueryClient } from '@tanstack/react-query';

const EditFamilyExpense = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;
    const queryClient = useQueryClient();
    const { editFamilyExpense, isPending } = useEditFamilyExpense();

    const formik = useFormik({
        initialValues: data ? {
            name: data.name || '',
            amount: data.amount || '',
            notes: data.notes || '',
        } : {
            name: '',
            amount: '',
            notes: '',
        },
        validationSchema: familyExpenseSchema,
        onSubmit: (values) => {
            editFamilyExpense({
                id: data?.id,
                data: {
                    name: values.name,
                    amount: values.amount,
                    notes: values.notes,
                }
            }, {
                onSuccess: () => {
                    navigate('/family-expense');
                    queryClient.invalidateQueries({ queryKey: ['familyExpenses'] });
                    formik.resetForm();
                },
            });
        },
    });

    return (
        <Layout headerText='تعديل مصروف الأسرة'>
            <div className="container py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/family-expense" className="flex items-center gap-2 text-secondary hover:text-primary">
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
                        <Link to="/family-expense">
                            <Button type="button" variant="outline" className="text-lg">إلغاء</Button>
                        </Link>
                        <Button type="submit" disabled={isPending} className="bg-secondary hover:bg-secondary text-lg">
                            {isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditFamilyExpense;