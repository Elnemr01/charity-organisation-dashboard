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
import { moneyInventories, moneyInventoryStyle, moneyInventoryTypes, moneyTablehead } from '@/constants/banks/bankConst';
import Empty from '@/appComponents/models/Empty';
import { Banknote, BriefcaseBusiness, HandCoins, Landmark, Pen, Sigma, SwitchCamera, Trash2 } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteCashInventory from '@/hooks/banks/money/useDeleteCashInventory';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllProductCategories from '@/hooks/categories/products/useGetAllProductCategories';
import EquelModel from '@/components/customUI/EquelModel';
import useEquelCashInventory from '@/hooks/banks/money/useEquelCashInventory';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import useGetAllDonationPurposes from '@/hooks/categories/donationPurpose/useGetAllDonationPurposes';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import EnumFilter from '@/components/customUI/EnumFilter';

const Money = () => {
    const [page, setPage] = useState(1);
    const [filter,setFilters]=useState({});
    const [catPage, setCatPage] = useState(1);
    const [newAmount, setNewAmount] = useState(0);
    const [categoryName, setCategoryName] = useState({});
    const [debounceValue, setDebounceValue] = useState('');
    const [catDebounceValue, setCatDebounceValue] = useState('');
    const {cashInventories, isLoading, isError} = useGetAllCashInventories({
        pageNumber: page,
        SearchValue: debounceValue || categoryName.name,
        Filters:filter
    });


    const tablehead = useMemo(() => moneyTablehead, [])
    const moneyInventoryStyleObj = useMemo(() => moneyInventoryStyle, [])
    const moneyInventoriesObj = useMemo(() => moneyInventories, [])

    const {donationPursposes, isLoading: isLoadingCategories, isError: isErrorCategories} = useGetAllDonationPurposes({
        page: catPage,
        searchValue: catDebounceValue
    });
    const queryClient = useQueryClient();
    const {equelCashInventory, isPending: isEquelPending} = useEquelCashInventory();



    return (
        <Layout headerText={'اداره المخازن'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-8 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                            مخزن الماليات
                        </h2>
                        <Button className={'bg-secondary p-2'}>
                            <Link to={'/banks/money/transfer'} className='flex items-center'>
                                <SwitchCamera size={15} className=''/>
                                <span className='mr-2'>تحويل بين الخزن</span>
                            </Link>
                        </Button>
                    </div>
                    <div className="inventories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                        <div className="card rounded-md bg-secondary p-4 text-white h-30 flex flex-col gap-2">
                            <h3 className='flex items-center gap-2 text-xl'>
                                <Sigma size={20} className="text-white" />
                                اجمالي المبلغ :
                            </h3>
                            <span className='text-2xl font-semibold'>
                                {cashInventories?.totalAmount || 0}
                            </span>
                        </div>
                        <div className="card rounded-md bg-transparent border text-secondary border-primary p-4 h-30 flex flex-col gap-2">
                            <h3 className='flex items-center gap-2 text-xl'>
                                <Landmark size={20} className="text-secondary" />
                                خزنه البنك :
                            </h3>
                            <span className='text-2xl font-semibold'>
                                {cashInventories?.bankTotal || 0}
                            </span>
                        </div>
                        <div className="card rounded-md bg-transparent border text-secondary border-primary p-4 h-30 flex flex-col gap-2">
                            <h3 className='flex items-center gap-2 text-xl'>
                                <HandCoins size={20} className="text-secondary" />
                                خزنه الجمعيه :
                            </h3>
                            <span className='text-2xl font-semibold'>
                                {cashInventories?.charityTotal || 0}
                            </span>
                        </div>
                        <div className="card rounded-md bg-transparent border text-secondary border-primary p-4 h-30 flex flex-col gap-2">
                            <h3 className='flex items-center gap-2 text-xl'>
                                <BriefcaseBusiness size={20} className="text-secondary" />
                                خزنه الامين :
                            </h3>
                            <span className='text-2xl font-semibold'>
                                {cashInventories?.treasurerTotal || 0}
                            </span>
                        </div>
                    </div>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                        <div className='flex gap-4 items-center'>
                            <CategoryListFilter
                                setCatDebounceValue={setCatDebounceValue}
                                setCategoryName={setCategoryName}
                                response={donationPursposes}
                                isLoading={isLoadingCategories}
                                isError={isErrorCategories}
                                setPage={setCatPage}
                            />
                            <EnumFilter
                                text={'الخزنه'}
                                propertyName={'cashInventoryType'}
                                data={moneyInventoryTypes}
                                filter={filter}
                                setFilter={setFilters}
                            />
                        </div>
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
                        cashInventories?.inventories?.items?.length === 0 ?
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
                                    {cashInventories?.inventories?.items.map((cash) => (
                                    <TableRow key={cash.id} className="text-center">
                                        <TableCell className={'p-6'}>{cash?.id}</TableCell>
                                        <TableCell className={'p-6'}>{cash?.amount || 0}</TableCell>
                                        <TableCell className={'p-6'}>
                                            <span className={`px-3 text-sm rounded-full ${moneyInventoryStyleObj[cash?.cashInventoryType]}`}>
                                                {moneyInventoriesObj[cash?.cashInventoryType]}
                                            </span>
                                        </TableCell>
                                        <TableCell className={'p-6'}>{cash?.purpose?.name}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(cash?.createdOn), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(cash?.lastUpdated), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <EquelModel
                                                message="هل تريد تسويه هذا المبلغ بعد عمليه الجرد？"
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
                            <Pagination setPage={setPage} response={cashInventories?.inventories}/>
                        </div>
                        
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Money