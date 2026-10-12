import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllCharityExpenses from '@/hooks/charityExpense/useGetAllCharityExpenses'
import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { charityExpenseTablehead } from '@/constants/charityExpense/charityExpenseConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Eye, Pen, Trash2, CreditCard } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteCharityExpense from '@/hooks/charityExpense/useDeleteCharityExpense';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import ConfirmPayModel from '@/components/customUI/ConfirmPayModel';
import usePayCharityExpense from '@/hooks/charityExpense/usePayCharityExpense';
import { moneyInventoryTypes } from '@/constants/banks/bankConst';

const CharityExpenseList = () => {
    const [page, setPage] = useState(1);
    const [debounceValue, setDebounceValue] = useState('');
    const { charityExpenses, isLoading, isError } = useGetAllCharityExpenses({
        pageNumber: page,
        SearchValue: debounceValue
    });
    const tablehead = useMemo(() => charityExpenseTablehead, [])
    const moneyInventoryTypesConst= useMemo(() => moneyInventoryTypes, [])
    const { deleteCharityExpense, isPending } = useDeleteCharityExpense();
    const queryClient = useQueryClient();
    const { payCharityExpense, isPending: isPayPending } = usePayCharityExpense();

    return (
        <Layout headerText={'مصروفات الحمعيه'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <div className="flex items-center justify-between">
                        <h2 className='text-xl font-semibold'>
                            مصروفات الحمعيه :
                        </h2>
                        <Link to="/charity-expense/add" className="bg-secondary hover:bg-secondary text-white px-4 py-2 rounded-md text-lg flex items-center gap-2">
                            <span>إضافة مصروف جديد</span>
                        </Link>
                    </div>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                    </div>
                </div>
                <div className="charity-expenses bg-white rounded-md shadow p-4">
                    {
                        isLoading ?
                        <div className='flex items-center justify-center h-[50vh]'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <div className="text-center text-red-500 text-lg py-8">حدث خطأ في تحميل البيانات</div>
                        :
                        charityExpenses?.items?.length === 0 ?
                        <Empty />
                        :
                        <div className=''>
                            <Table className={'p-4 '}>
                                <TableHeader>
                                    <TableRow>
                                        {tablehead.map((head, index) => (
                                            <TableHead key={index} className=" p-4 text-center text-lg">{head}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody className={""}>
                                    {charityExpenses?.items?.map((expense) => (
                                    <TableRow key={expense.id} className="text-center">
                                        <TableCell className={'p-6 text-lg'}>{expense?.id}</TableCell>
                                        <TableCell className={'p-6 text-lg'}>{expense?.name}</TableCell>
                                        <TableCell className={'p-6 text-lg'}>{expense?.amount}</TableCell>
                                        <TableCell className={'p-6 text-lg'}>{format(new Date(expense?.lastPayDate), 'yyyy-MM-dd') || 'لا يوجد تاريخ دفع'}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3 justify-center">
                                                <Link to={`/charity-expense/${expense.id}`} className="text-secondary hover:text-primary transition-colors" title="تفاصيل">
                                                    <Eye size={20} />
                                                </Link>
                                                <Link to={`/charity-expense/add`} state={{ data: expense, edit: true }} className="text-secondary hover:text-primary transition-colors" title="تعديل">
                                                    <Pen size={20} />
                                                </Link>
                                                <DeleteModel
                                                    message="هل أنت متأكد من حذف هذا المصروف؟"
                                                    wait={isPending}
                                                    deleteFun={() => {
                                                        deleteCharityExpense(expense.id, {
                                                            onSuccess: () => {
                                                                queryClient.invalidateQueries({ queryKey: ['charityExpenses'] })
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <Trash2 size={20} className='text-red-500' title="حذف" />
                                                </DeleteModel>
                                                <ConfirmPayModel
                                                    message="هل تريد سداد هذا المصروف؟"
                                                    wait={isPayPending}
                                                    onConfirm={(payData) => {
                                                        payCharityExpense({ id: expense.id, data: payData }, {
                                                            onSuccess: () => {
                                                                queryClient.invalidateQueries({ queryKey: ['charityExpenses'] })
                                                            }
                                                        })
                                                    }}
                                                    inventoryTypes={moneyInventoryTypesConst}
                                                    data={expense}
                                                >
                                                    <CreditCard size={20} className='text-secondary hover:text-primary transition-colors' title="سداد" />
                                                </ConfirmPayModel>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination setPage={setPage} response={charityExpenses} />
                        </div>

                    }
                </div>
            </div>
        </Layout>
    )
}

export default CharityExpenseList