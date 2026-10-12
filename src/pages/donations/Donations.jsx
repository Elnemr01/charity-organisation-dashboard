import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllDonations from '@/hooks/donations/useGetAllDonations'
import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { donationTablehead } from '@/constants/donations/donationConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Eye, Pen, Plus, Trash2 } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteDonation from '@/hooks/donations/useDeleteDonation';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const Donations = () => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({});
    const [searchColumn, setSearchColumn] = useState({});
    const [debounceValue, setDebounceValue] = useState('');
    const { donations, isLoading, isError } = useGetAllDonations({
        pageNumber: page,
        SearchValue: debounceValue,
        searchColumn: debounceValue ? searchColumn?.id : undefined,
        Filter: filter,
    });
    const { deleteDonation, isPending } = useDeleteDonation();
    const tablehead = useMemo(() => donationTablehead, [])
    const queryClient = useQueryClient();

    return (
        <Layout headerText={'اداره التبرعات'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                        قائمة التبرعات
                        </h2>
                        <Button className={'bg-secondary p-2'}>
                            <Link to={'/donations/add'} className='flex items-center'>
                                <Plus size={15} className=''/>
                                <span className='mr-2'>إضافة تبرع</span>
                            </Link>
                        </Button>
                    </div>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                    </div>
                </div>
                <div className="donation-items bg-white rounded-md shadow p-4">
                    {
                        isLoading ?
                        <div className='flex items-center justify-center h-[50vh]'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <Empty message="حدث خطأ في تحميل البيانات" />
                        :
                        donations?.items?.length === 0 ?
                        <Empty message="لا توجد تبرعات" />
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
                                    {donations?.items?.map((donation) => (
                                    <TableRow key={donation.id} className="text-center">
                                        <TableCell className={'p-6'}>{donation?.id || 'لا يوحد'}</TableCell>
                                        <TableCell className={'p-6'}>{donation?.donorName || 'لا يوحد'}</TableCell>
                                        <TableCell className={'p-6'}>{donation?.donationDeliverer || 'لا يوحد'}</TableCell>
                                        <TableCell className={'p-6'}>{donation?.receiptNumber || 'لا يوحد'}</TableCell>
                                        <TableCell className={'p-6'}>{donation?.donorPhone || 'لا يوحد'}</TableCell>
                                        <TableCell className={'p-6'}>
                                            {donation?.donationProductItemsCount === 0 && 'نقدى' }
                                            {donation?.donationProductItemsCount > 0  && donation.cashAmount ===null && 'عينى' }
                                            {donation?.donationProductItemsCount > 0  && donation.cashAmount > 0 && 'نقدى وعينى' }
                                        </TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(donation?.createdOn), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell className={'p-6'}>
                                            {
                                                donation?.updatedOn ? format(new Date(donation.updatedOn), 'yyyy-MM-dd')
                                                :
                                                format(new Date(donation?.createdOn), 'yyyy-MM-dd')
                                            }
                                            </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <Link to={`/donations/${donation.id}`}>
                                                    <Eye size={16} className='text-primary'/>
                                                </Link>
                                                <Link to={`/donations/add`} state={{edit:true,data:donation}}>
                                                    <Pen size={16} className='text-secondary'/>
                                                </Link>
                                                <DeleteModel
                                                message="هل أنت متأكد من حذف هذا التبرع؟"
                                                wait={isPending}
                                                deleteFun={() => {
                                                    deleteDonation(donation.id, {
                                                        onSuccess: () => {
                                                            queryClient.invalidateQueries({ queryKey: ['donations'] })
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
                            <Pagination setPage={setPage} response={donations} />
                        </div>

                    }
                </div>
            </div>
        </Layout>
    )
}

export default Donations