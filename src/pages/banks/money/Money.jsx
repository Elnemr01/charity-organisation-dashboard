import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllCashInventories from '@/hooks/banks/money/useGetAllCashInventories'
import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { moneyInventories, moneyInventoryStyle, moneyTablehead } from '@/constants/banks/bankConst';
import Empty from '@/appComponents/models/Empty';
import { Pen, Trash2 } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteCashInventory from '@/hooks/banks/money/useDeleteCashInventory';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllProductCategories from '@/hooks/categories/products/useGetAllProductCategories';
import EquelModel from '@/components/customUI/EquelModel';
import useEquelCashInventory from '@/hooks/banks/money/useEquelCashInventory';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';

const Money = () => {
    const [page, setPage] = useState(1);
    const [catPage, setCatPage] = useState(1);
    const [newAmount, setNewAmount] = useState(0);
    const [categoryName, setCategoryName] = useState(null);
    const [debounceValue, setDebounceValue] = useState('');
    const [catDebounceValue, setCatDebounceValue] = useState('');
    const {cashInventories, isLoading, isError} = useGetAllCashInventories({
        pageNumber: page,
        SearchValue: debounceValue || categoryName
    });

    const tablehead = useMemo(() => moneyTablehead, [])

    const {donationPursposes, isLoading: isLoadingCategories, isError: isErrorCategories} = useGetAllDonationPurposes({
        page: catPage,
        searchValue: catDebounceValue
    });
    const queryClient = useQueryClient();
    const {equelCashInventory, isPending: isEquelPending} = useEquelCashInventory();


    return (
        <Layout headerText={'اداره المخازن'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <h2 className='text-xl font-semibold'>
                        مخزن الماليات :
                    </h2>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                        <CategoryListFilter
                            setCatDebounceValue={setCatDebounceValue}
                            setCategoryName={setCategoryName}
                            response={donationPursposes}
                            isLoading={isLoadingCategories}
                            isError={isErrorCategories}
                            setPage={setCatPage}
                        />
                    </div>
                </div>
                <div className="money-items bg-white rounded-md shadow p-4">
                    {
                        isLoading ? 
                        <div className='flex items-center justify-center h-screen'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <div className="text-center text-red-500 p-4">حدث خطأ في تحميل البيانات</div>
                        :
                        cashInventories?.items?.length === 0 ?
                        <Empty/>
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
                                    {cashInventories?.items?.map((cash) => (
                                    <TableRow key={cash.id} className="text-center">
                                        <TableCell className={'p-6'}>{cash?.id}</TableCell>
                                        <TableCell className={'p-6'}>{cash?.amount || 0}</TableCell>
                                        <TableCell className={'p-6'}>
                                            <span className={`px-3 text-sm rounded-full ${moneyInventoryStyle[cash?.cashInventoryType]}`}>
                                                {moneyInventories[cash?.cashInventoryType]}
                                            </span>
                                        </TableCell>
                                        <TableCell className={'p-6'}>{cash?.purpose?.name}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(cash?.lastUpdated), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(cash?.lastUpdated), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <EquelModel
                                                message="هل تريد تسويه هذا المبلغ بعد عمليه الجرد؟"
                                                wait={isEquelPending}
                                                onChange={setNewAmount}
                                                amount={cash?.amount}
                                                equelFun={() => {
                                                    equelCashInventory({id: cash.id, data: {newAmount}}, {
                                                        onSuccess: () => {
                                                            queryClient.invalidateQueries({queryKey: ['cashInventories']})
                                                        }
                                                    })
                                                }}
                                                >
                                                    <Pen size={16} className='text-secondary'/>
                                                </EquelModel>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination setPage={setPage} response={cashInventories}/>
                        </div>
                        
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Money