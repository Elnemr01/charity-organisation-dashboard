import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllCases from '@/hooks/cases/useGetAllCases'
import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { caseTablehead, caseFilterVals } from '@/constants/cases/caseConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Eye, Pen, Trash2 } from 'lucide-react';
import FilterVals from '@/components/customUI/FilterVals';
import useGetAllCaseCategories from '@/hooks/categories/case/useGetAllCaseCategories';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import { maritalStatusObj, relationToFamiltObj } from '@/constants/families/familyEnums';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteCase from '@/hooks/cases/useDeleteCase';
import { useQueryClient } from '@tanstack/react-query';

const Cases = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [catPage, setCatPage] = useState(1);
    const [catDebounceValue, setCatDebounceValue] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchColumn, setSearchColumn] = useState({});
    const [filter, setFilter] = useState({});
    const { cases, isLoading, isError } = useGetAllCases({
        pageNumber: page,
        SearchValue: debounceValue,
        searchColumn: debounceValue ? searchColumn?.id : undefined,
        Filter: filter,
    });
    const {deleteCase,isPending}=useDeleteCase();
    const { caseCategories, isLoading: isCaseCategorLoading, isError: isCaseCategoryError } = useGetAllCaseCategories({
        pageNumber: catPage,
        SearchValue: catDebounceValue,
    });
    const tablehead = useMemo(() => caseTablehead, [])
    const filterValsArr = useMemo(() => caseFilterVals, [])

    const maritalStatus = useMemo(()=> maritalStatusObj,[])
    // const relationToFamily = useMemo(()=> relationToFamiltObj,[])

    const handleCategorySelect = (category) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            categoryId: category ? category.id : undefined
        }));
    };

    return (
        <Layout headerText={'إدارة الحالات'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                        قائمة الحالات
                        </h2>
                    </div>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                        <div className="filters flex items-center gap-4">
                            <CategoryListFilter
                                setCategoryName={handleCategorySelect}
                                response={caseCategories}
                                isLoading={isCaseCategorLoading}
                                isError={isCaseCategoryError}
                                setPage={setCatPage}
                                setCatDebounceValue={setCatDebounceValue}
                                text={'تصنيف الحاله'}
                                showAll={true}
                            />

                            <FilterVals
                                data={filterValsArr}
                                value={searchColumn}
                                setFilter={setSearchColumn}
                            />

                        </div>
                    </div>
                </div>
                <div className="case-items bg-white rounded-md shadow p-4">
                    {
                        isLoading ?
                        <div className='flex items-center justify-center h-screen'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <Empty message="حدث خطأ في تحميل البيانات" />
                        :
                        cases?.items?.length === 0 ?
                        <Empty message="لا يوجد حالات حتى الان" />
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
                                    {cases?.items?.map((caseItem) => (
                                    <TableRow key={caseItem.id} className="text-center">
                                        <TableCell className={'p-6'}>{caseItem?.name || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.nationalId || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.age || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{maritalStatus[caseItem?.maritalStatus] || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.job || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.healthStatus || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.phone || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.familyName || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>
                                            <div className='flex flex-col gap-1 items-center justify-center'>
                                                {
                                                    caseItem?.categories?.length === 0 ? (
                                                        <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                                                            لا يوجد
                                                        </span>
                                                    )
                                                    :
                                                    <span className="px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                                                        {caseItem?.categories[0].name} {`${caseItem?.categories?.length>=2 ? `+ ${caseItem?.categories?.length-1}`: ''}` }
                                                    </span>

                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell className={'p-6'}>{caseItem?.createdOn ? caseItem.createdOn.split('T')[0] : 'لا يوجد'}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <Link to={`/cases/${caseItem.id}`}>
                                                    <Eye size={16} className='text-primary'/>
                                                </Link>
                                                <Link to={`/cases/add`} state={{data:caseItem,edit:true}}>
                                                    <Pen size={16} className='text-secondary'/>
                                                </Link>
                                                <DeleteModel
                                                message={'هل انت متأكد من حذف هذه الحاله من العائله ؟'}
                                                wait={isPending}
                                                deleteFun={()=>{
                                                    deleteCase(caseItem.id);
                                                    queryClient.invalidateQueries({ queryKey: ['cases'] });
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
                            <Pagination setPage={setPage} response={cases} />
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Cases