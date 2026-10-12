import Layout from '@/appComponents/layout/Layout';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import useGetCharityExpenseById from '@/hooks/charityExpense/useGetCharityExpenseById';
import { useParams } from 'react-router';
import Loading from '@/appComponents/models/Loading';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import ConfirmPayModel from '@/components/customUI/ConfirmPayModel';
import { useMemo, useState } from 'react';
import { moneyInventoryTypes } from '@/constants/banks/bankConst';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';
import { useQueryClient } from '@tanstack/react-query';
import usePayCharityExpense from '@/hooks/charityExpense/usePayCharityExpense';

const CharityExpenseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { charityExpense, isLoading, isError } = useGetCharityExpenseById(id);
    const moneyInventoryTypesConst=useMemo(()=> moneyInventoryTypes,[])

    const queryClient = useQueryClient();
    const { payCharityExpense, isPending: isPayPending } = usePayCharityExpense();
    
    
    
    
    
    
    
    if (isLoading) {
        return (
            <Layout headerText='تفاصيل مصروف الجمعية'>
                <div className="container py-10">
                    <div className='flex items-center justify-center h-screen'>
                        <Loading />
                    </div>
                </div>
            </Layout>
        );
    }

    if (isError || !charityExpense) {
        return (
            <Layout headerText='تفاصيل مصروف الجمعية'>
                <div className="container py-10">
                    <div className="text-center text-red-500 text-lg py-8">حدث خطأ في تحميل البيانات</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout headerText='تفاصيل مصروف الجمعية'>
            <div className="container py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/charity-expense" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 text-gray-500 text-lg">اسم المصروف</label>
                            <p className="text-lg font-semibold">{charityExpense.name}</p>
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-500 text-lg">المبلغ</label>
                            <p className="text-lg font-semibold">{charityExpense.amount}</p>
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-500 text-lg">تاريخ آخر سداد</label>
                            <p className="text-lg font-semibold">{format(new Date(charityExpense.lastPayDate), 'yyyy-MM-dd')}</p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <label className="block mb-2 text-gray-500 text-lg">الملاحظات</label>
                        <p className="text-lg whitespace-pre-wrap">{charityExpense.notes || 'لا يوجد ملاحظات'}</p>
                    </div>

                    <div className="flex items-center justify-start gap-4 mt-8 pt-8 border-t">
                        <Button className="bg-secondary hover:bg-secondary text-lg"
                        onClick={() => navigate('/charity-expense/add', { state: { data: charityExpense, edit: true } })}>تعديل</Button>
                        <ConfirmPayModel
                        message="هل تريد سداد هذا المصروف؟"
                        wait={isPayPending}
                        onConfirm={(payData) => {
                            payCharityExpense({ id: charityExpense.id, data: payData }, {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ['charityExpenses'] })
                                    navigate('/charity-expense');
                                }
                            })
                        }}
                        inventoryTypes={moneyInventoryTypesConst}
                        data={charityExpense}
                    >
                            <Button className="bg-primary hover:bg-primary text-lg">تأكيد السداد</Button>
                        </ConfirmPayModel>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CharityExpenseDetails;