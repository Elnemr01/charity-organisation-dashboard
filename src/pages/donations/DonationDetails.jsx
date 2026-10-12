import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Error from '@/appComponents/models/Error';
import useGetDonationById from '@/hooks/donations/useGetDonationById';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Edit, User, Phone, Package, FileText, Calendar, DollarSign, MessageSquare, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { moneyInventories } from '@/constants/banks/bankConst';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteDonation from '@/hooks/donations/useDeleteDonation';
import { useQueryClient } from '@tanstack/react-query';

const DonationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { donation, isLoading, isError } = useGetDonationById(id);
    const { deleteDonation, isPending } = useDeleteDonation();

    const getValue = useMemo(() => (value, fallback = 'لا يوجد قيمة') => {
        if (value === null || value === undefined || value === '') {
            return fallback;
        }
        return value;
    }, [])

    const moneyInventoriesObj = useMemo(() => moneyInventories, [])

    const hasCashDonation = donation?.cashAmount !== null && donation?.cashAmount !== undefined && donation.cashAmount > 0;
    const hasProductItems = donation?.donationProductItems && donation.donationProductItems.length > 0;

    return (
        <Layout headerText={'تفاصيل التبرع'}>
            <div className="container py-10 my-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/donations" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                </div>

                {isLoading && (
                    <div className='flex items-center justify-center h-[60vh]'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <Error message="حدث خطأ في تحميل بيانات التبرع" />
                )}

                {donation && !isLoading && !isError && (
                    <>
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 className="text-lg font-semibold text-secondary mb-4">معلومات التبرع الأساسية</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3  bg-gray-50 rounded-lg">
                                            <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-sm">اسم المتبرع</p>
                                                <p className="text-base font-medium">{getValue(donation.donorName, 'لا يوجد اسم متبرع')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            {donation.donorId && (
                                                <Link
                                                    to={`/doners/${donation.donorId}`}
                                                    className="flex items-center gap-1 text-sm text-secondary hover:text-primary bg-secondary/10 px-3 py-1.5 rounded-lg transition-colors"
                                                >
                                                    <ExternalLink size={14} />
                                                تفاصيل المتبرع
                                                </Link>
                                            )}
                                    </div>
                                        </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">هاتف المتبرع</p>
                                            <p className="text-base font-medium">{getValue(donation.donorPhone)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">مقدم التبرع</p>
                                            <p className="text-base font-medium">{getValue(donation.donationDeliverer)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">رقم الإيصال</p>
                                            <p className="text-base font-medium">{getValue(donation.receiptNumber)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">تاريخ الإنشاء</p>
                                            <p className="text-base font-medium">
                                                {donation.createdOn
                                                    ? format(new Date(donation.createdOn), 'yyyy-MM-dd HH:mm')
                                                    : 'لا يوجد تاريخ'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">تاريخ آخر تحديث</p>
                                            <p className="text-base font-medium">
                                                {donation.updatedOn
                                                    ? format(new Date(donation.updatedOn), 'yyyy-MM-dd HH:mm')
                                                    : 'لا يوجد تاريخ'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {hasCashDonation && (
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                                    <DollarSign size={20} />
                                    بيانات التبرع النقدي
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-right">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="p-3 text-sm font-semibold text-secondary">طريقة الدفع</th>
                                                <th className="p-3 text-sm font-semibold text-secondary">المبلغ</th>
                                                <th className="p-3 text-sm font-semibold text-secondary">غرض التبرع</th>
                                                <th className="p-3 text-sm font-semibold text-secondary">نوع الخزنة</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-100">
                                                <td className="p-3 text-base">{getValue(donation.paymentMethod)}</td>
                                                <td className="p-3 text-base font-medium text-secondary">
                                                    {donation.cashAmount.toLocaleString()} ج.م
                                                </td>
                                                <td className="p-3 text-base">{getValue(donation.cashDonationPurposeName)}</td>
                                                <td className="p-3 text-base">{moneyInventoriesObj[donation?.cashInventoryType]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {hasProductItems && (
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
                                    <Package size={20} />
                                    محتويات التبرع العيني
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-right">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="p-3 text-sm font-semibold text-secondary">الصنف</th>
                                                <th className="p-3 text-sm font-semibold text-secondary">الوحدة</th>
                                                <th className="p-3 text-sm font-semibold text-secondary">الغرض</th>
                                                <th className="p-3 text-sm font-semibold text-secondary">الكمية</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {donation.donationProductItems.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-100">
                                                    <td className="p-3 text-base">{getValue(item.productName)}</td>
                                                    <td className="p-3 text-base">{getValue(item.unitName)}</td>
                                                    <td className="p-3 text-base">{getValue(item.donationPurposeName)}</td>
                                                    <td className="p-3 text-base font-medium">
                                                        {item.amount !== null && item.amount !== undefined
                                                            ? `${item.amount} ${getValue(item.unitName)}`
                                                            : 'لا يوجد كمية'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">إجمالي الأصناف: {donation.donationProductItemsCount ?? 0}</p>
                            </div>
                        )}

                        {!hasCashDonation && !hasProductItems && (
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    <p className="text-base">لا توجد تفاصيل تبرع نقدي أو عيني للعرض</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">ملاحظات</p>
                                    <p className="text-base font-medium">{getValue(donation.notes)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-start gap-4 pt-4 border-t">
                            <Link
                                to="/donations/add"
                                state={{ data: donation, edit: true }}
                                className='py-4'
                            >
                                <Button className="bg-secondary hover:bg-secondary/90 p-4 py-6">
                                    <Edit size={16} className="ml-2" />
                                    تعديل التبرع
                                </Button>
                            </Link>
                            <DeleteModel
                            message={'هل انت متأكد من حذف هذا التبرع ؟'}
                            wait={isPending}
                            deleteFun={() => deleteDonation(donation.id,{
                                onSuccess:()=> {
                                    queryClient.invalidateQueries({ queryKey: ['donations'] });
                                    navigate('/donations')
                                }
                            })}
                            >
                                <Button className="bg-red-500 hover:bg-red-600 text-white p-4 py-6">
                                    <Trash2 size={16} className="ml-2" />
                                    حذف التبرع
                                </Button>
                            </DeleteModel>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default DonationDetails;