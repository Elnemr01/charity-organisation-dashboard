import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Empty from '@/appComponents/models/Empty';
import useGetDonerById from '@/hooks/doners/useGetDonerById';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Edit, Users, Phone, DollarSign, Calendar, CheckCircle, XCircle, Pen, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Pagination from '@/appComponents/pagination/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { donationsInDonerPage } from '@/constants/donations/donationConst';
import useDeleteDonation from '@/hooks/donations/useDeleteDonation';
import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import DeleteModel from '@/components/customUI/DeleteModel';


const DonerDetails = () => {
    const { id } = useParams();
    const [page,setPage]=useState(1);
    const { doner, isLoading, isError } = useGetDonerById({
        id,
        data: {pageNumber: page,}
    });

    const { deleteDonation, isPending } = useDeleteDonation();
    const tablehead = useMemo(() => donationsInDonerPage, [])
    const queryClient = useQueryClient();

    return (
        <Layout headerText={'تفاصيل المتبرع'}>
            <div className="container py-10">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/doners" className="flex items-center gap-2 text-secondary hover:text-primary">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Link>
                    {doner && (
                        <Link to={`/doners/add`} className="ml-auto" state={{data:doner,edit:true}}>
                            <Button variant="outline" className="gap-2 cursor-pointer">
                                <Edit size={16} /> تعديل
                            </Button>
                        </Link>
                    )}
                </div>

                {isLoading && (
                    <div className='flex items-center justify-center h-screen'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <Empty message="حدث خطأ في تحميل بيانات المتبرع" />
                )}

                {doner && !isLoading && !isError && 
                <>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">الاسم</p>
                                        <p className="text-lg font-semibold">{doner.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">الهاتف</p>
                                        <p className="text-lg font-semibold">{doner.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        {doner.isSubscriber ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">مشترك</p>
                                        <p className="text-lg font-semibold">
                                            {doner.isSubscriber ? 'نعم' : 'لا'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        <DollarSign size={20} />
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">مبلغ الاشتراك</p>
                                        <p className="text-lg font-semibold">{doner.subscriptionAmount} ج.م</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">إجمالي التبرعات</p>
                                        <p className="text-lg font-semibold">{doner.totalDonations}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">تاريخ الإنشاء</p>
                                        <p className="text-lg font-semibold">
                                            {format(new Date(doner.createdOn), 'yyyy-MM-dd HH:mm')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-secondary text-secondary-foreground rounded-lg">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className=" text-muted-foreground">تاريخ آخر تحديث</p>
                                        <p className="text-lg font-semibold">
                                            {doner.updatedOn ? format(new Date(doner.updatedOn), 'yyyy-MM-dd HH:mm') : 
                                            format(new Date(doner.createdOn), 'yyyy-MM-dd HH:mm')
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className=' my-4 text-lg font-semibold'>
                        التبرعات التى قام بها : 
                    </h3>
                    <div className="donations bg-white rounded-lg shadow p-6 mt-4">
                        {doner?.donations?.items?.length === 0 ?
                            <Empty text="لا توجد تبرعات" />
                            :
                            <div className=''>
                                <Table className={'p-4 '}>
                                    <TableHeader>
                                        <TableRow>
                                            {tablehead.map((head, index) => (
                                                <TableHead key={index} className=" p-4 text-center">{head}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className={""}>
                                        {doner?.donations?.items?.map((donation) => (
                                        <TableRow key={donation.id} className="text-center">
                                            <TableCell className={'p-6'}>{donation?.id}</TableCell>
                                            <TableCell className={'p-6'}>
                                                {donation?.donationDeliverer ? donation?.donationDeliverer : 'غير محدد'}
                                            </TableCell>
                                            <TableCell className={'p-6'}>
                                                {donation?.receiptNumber ? donation?.receiptNumber : 'غير محدد'}
                                            </TableCell>
                                            <TableCell className={'p-6'}>
                                                {donation?.productItemsCount === 0 ? 'نقدى' : 'عينى'}
                                            </TableCell>
                                            <TableCell className={'p-6'}>{format(new Date(donation?.createdOn), 'yyyy-MM-dd')}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4 justify-center">
                                                    <Link to={`/donations/${donation.id}`}>
                                                        <Eye size={16} className='text-primary'/>
                                                    </Link>
                                                    <Link to={`/donations/add`} state={{data:donation,edit:true}}>
                                                        <Pen size={16} className='text-secondary'/>
                                                    </Link>
                                                    <DeleteModel
                                                    message="هل أنت متأكد من حذف هذا التبرع؟"
                                                    wait={isPending}
                                                    deleteFun={() => {
                                                        deleteDonation(donation.id, {
                                                            onSuccess: () => {
                                                                queryClient.invalidateQueries({ queryKey: ['donations'] })
                                                                queryClient.invalidateQueries({ queryKey: ['donerById'] })
                                                            }
                                                        })
                                                    }}
                                                    >
                                                        <Trash2 size={16} className='text-red-500'/>
                                                    </DeleteModel>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Pagination setPage={setPage} response={doner?.donations} />
                            </div>
                        }
                    </div>
                </>
                }



            </div>
        </Layout>
    );
};

export default DonerDetails;