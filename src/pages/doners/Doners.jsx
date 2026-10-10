import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllDoners from '@/hooks/doners/useGetAllDoners'
import { useCallback, useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { donerTablehead } from '@/constants/doners/donerConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Eye, Pen, Plus, Trash2 } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteDoner from '@/hooks/doners/useDeleteDoner';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import EnumFilter from '@/components/customUI/EnumFilter';

const Doners = () => {
    const [page, setPage] = useState(1);
    const [debounceValue, setDebounceValue] = useState('');
    const [filter,setFilter]=useState({})
    const [subscripers,setSub]=useState(false)
    const { doners, isLoading, isError } = useGetAllDoners({
        pageNumber: page,
        SearchValue: debounceValue,
        Filter: filter,
    });
    const { deleteDoner, isPending } = useDeleteDoner();
    const tablehead = useMemo(() => donerTablehead, [])
    const queryClient = useQueryClient();


    return (
        <Layout headerText={'اداره المتبرعين'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                        قائمة المتبرعين
                        </h2>
                        <Button className={'bg-secondary p-2'}>
                            <Link to={'/doners/add'} className='flex items-center'>
                                <Plus size={15} className=''/>
                                <span className='mr-2'>إضافة متبرع</span>
                            </Link>
                        </Button>
                    </div>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                        <div className="filters">
                            <EnumFilter
                                data={[{id:null,name:'الكل'},{id:true,name:'المشتركين'},{id:false,name:'غير المشتركين'}]}
                                text={'المشتركين'}
                                setFilter={setFilter}
                                filter={filter}
                                propertyName={'isSubscriber'}
                            />
                            
                        </div>
                    </div>
                </div>
                <div className="doner-items bg-white rounded-md shadow p-4">
                    {
                        isLoading ?
                        <div className='flex items-center justify-center h-screen'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <Empty message="حدث خطأ في تحميل البيانات" />
                        :
                        doners?.items?.length === 0 ?
                        <Empty message="لا يوجد متبرعين حتى الان" />
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
                                    {doners?.items?.map((doner) => (
                                    <TableRow key={doner.id} className="text-center">
                                        <TableCell className={'p-6'}>{doner?.id}</TableCell>
                                        <TableCell className={'p-6'}>{doner?.name}</TableCell>
                                        <TableCell className={'p-6'}>
                                            {doner?.phone ? doner?.phone : <span className="text-red-500 px-2 rounded-full bg-red-200 ">لا يوجد</span>}
                                        </TableCell>
                                        <TableCell className={'p-6'}>
                                            {doner?.isSubscriber ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                                                    مشترك
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                                                    ليس مشترك
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className={'p-6'}>{doner?.totalDonations}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(doner?.createdOn), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell className={'p-6'}>
                                            {doner?.updatedOn ? format(new Date(doner?.updatedOn), 'yyyy-MM-dd') : 
                                            format(new Date(doner?.createdOn), 'yyyy-MM-dd')
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <Link to={`/doners/${doner.id}`}>
                                                    <Eye size={16} className='text-primary'/>
                                                </Link>
                                                <Link to={`/doners/add`} state={{data:doner,edit:true}}>
                                                    <Pen size={16} className='text-secondary'/>
                                                </Link>
                                                <DeleteModel
                                                message="هل أنت متأكد من حذف هذا المتبرع؟"
                                                wait={isPending}
                                                deleteFun={() => {
                                                    deleteDoner(doner.id, {
                                                        onSuccess: () => {
                                                            queryClient.invalidateQueries({ queryKey: ['doners'] })
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
                            <Pagination setPage={setPage} response={doners} />
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Doners