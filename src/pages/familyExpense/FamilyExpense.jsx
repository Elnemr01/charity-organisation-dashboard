import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllFamilyExpenses from '@/hooks/familyExpense/useGetAllFamilyExpenses'
import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { familyExpenseTablehead } from '@/constants/familyExpense/familyExpenseConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Pen } from 'lucide-react';
import { format } from 'date-fns';

const FamilyExpense = () => {
    const [debounceValue, setDebounceValue] = useState('');
    const { familyExpenses, isLoading, isError } = useGetAllFamilyExpenses();
    const tablehead = useMemo(() => familyExpenseTablehead, [])

    return (
        <Layout headerText={'مصروفات الأسرة الثابته فى جدول الانفاق'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <h2 className='text-xl font-semibold'>
                        مصروفات الأسرة :
                    </h2>
                    {/* <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                    </div> */}
                </div>
                <div className="family-expenses bg-white rounded-md shadow p-4">
                    {
                        isLoading ?
                        <div className='flex items-center justify-center h-screen'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <div className="text-center text-red-500 text-lg py-8">حدث خطأ في تحميل البيانات</div>
                        :
                        familyExpenses?.length === 0 ?
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
                                    {familyExpenses?.map((expense) => (
                                    <TableRow key={expense.id} className="text-center">
                                        <TableCell className={'p-6 text-lg'}>{expense?.id}</TableCell>
                                        <TableCell className={'p-6 text-lg'}>{expense?.name}</TableCell>
                                        <TableCell className={'p-6 text-lg'}>{expense?.amount}</TableCell>
                                        <TableCell className={'p-6 text-lg'}>
                                            {
                                                expense?.lastUpdateDate ? format(new Date(expense?.lastUpdateDate), 'yyyy-MM-dd') : 'لا يوجد تاريخ تعديل'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <Link to={`/family-expense/edit/${expense.id}`} state={{data:expense}}
                                                className="text-secondary hover:text-primary transition-colors">
                                                    <Pen size={20} />
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default FamilyExpense