import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { donerSchema } from '@/constants/schemas/donerSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import useAddDoner from '@/hooks/doners/useAddDoner';
import { useQueryClient } from '@tanstack/react-query';
import useEditDoner from '@/hooks/doners/useEditDoner';

const AddDoner = () => {
    const navigate = useNavigate();
    const { addDoner, isPending } = useAddDoner();
    const {editDoner ,isPending: editPending }=useEditDoner();
    const location=useLocation();
    
    const edit=location.state?.edit;
    const data=location.state?.data;

    const queryClient = useQueryClient();
    const formik = useFormik({
        initialValues: !edit ?
        {
            name: '',
            phone: '',
            isSubscriber: "false",
            subscriptionAmount: 0,
        }
        :
        {
            name: data.name || '',
            phone: data?.phone || '',
            isSubscriber: data?.isSubscriber ? "true" : "false",
            subscriptionAmount: data?.subscriptionAmount || 0,
        },
        validationSchema: donerSchema,
        onSubmit: (values) => {
            
            if(edit) {
                editDoner({
                    id:data?.id,
                    data : {
                        ...values,
                        isSubscriber: values.isSubscriber==="false"? false : true
                    }
                }, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ['doners']});
                        navigate('/doners');
                    },
                });
            }
            else {
                addDoner(values= {
                    ...values,
                    isSubscriber: values.isSubscriber==="false"? false : true
                }, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey:  ['doners']});
                        navigate('/doners');
                    },
                });
            }
        },
    });

    return (
        <Layout headerText={edit ? 'تعديل بيانات المتبرع' : 'إضافة متبرع جديد'}>
            <div className="container py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/doners" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>

                <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block mb-2">الاسم *</label>
                            <Input
                                id="name"
                                {...formik.getFieldProps('name')}
                                className={formik.touched.name && formik.errors.name ? 'border-red-500' : ''}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block mb-2">رقم الهاتف *</label>
                            <Input
                                id="phone"
                                type="tel"
                                {...formik.getFieldProps('phone')}
                                className={formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}
                                placeholder="01xxxxxxxxx"
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2">مشترك *</label>
                            <select
                                {...formik.getFieldProps('isSubscriber')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            >
                                <option value={false}>لا</option>
                                <option value={true}>نعم</option>
                            </select>
                            {formik.touched.isSubscriber && formik.errors.isSubscriber && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.isSubscriber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="subscriptionAmount" className="block mb-2">مبلغ الاشتراك</label>
                            <Input
                                id="subscriptionAmount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                {...formik.getFieldProps('subscriptionAmount')}
                                className={formik.touched.subscriptionAmount && formik.errors.subscriptionAmount ? 'border-red-500' : ''}
                                disabled={formik.values.isSubscriber=== "false"}
                            />
                            {formik.touched.subscriptionAmount && formik.errors.subscriptionAmount && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.subscriptionAmount}</p>
                            )}
                            {formik.values.isSubscriber=== "false" && (
                                <p className="text-gray-500 text-sm mt-1">مبلغ الاشتراك مطلوب فقط للمشتركين</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t">
                        <Link to="/doners">
                            <Button type="button" variant="outline">إلغاء</Button>
                        </Link>
                        <Button type="submit" disabled={isPending || editPending} className="bg-secondary hover:bg-secondary">
                            {edit ? (editPending ? 'جاري التعديل...' : 'تعديل المتبرع') :
                            (isPending ? 'جاري الإضافة...' : 'إضافة المتبرع')}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddDoner;