import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllFamilies from '@/hooks/families/useGetAllFamilies'
import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { familyTablehead, familyEnumFilter, filterVals } from '@/constants/families/familyConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Eye, Pen, Plus, Trash2 } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteFamily from '@/hooks/families/useDeleteFamily';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import EnumFilter from '@/components/customUI/EnumFilter';
import FilterVals from '@/components/customUI/FilterVals';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllCaseCategories from '@/hooks/categories/case/useGetAllCaseCategories';

const Families = () => {
    const [page, setPage] = useState(1);
    const [aidPage, setAidPage] = useState(1);
    const [aidDebounceValue, setAidDebounceValue] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchColumn, setSearchColumn] = useState({});
    const [filter, setFilter] = useState({});
    const { families, isLoading, isError } = useGetAllFamilies({
        pageNumber: page,
        SearchValue: debounceValue,
        searchColumn: debounceValue ? searchColumn?.id : undefined,
        Filter: filter,
    });
    const { deleteFamily, isPending } = useDeleteFamily();
    const {caseCategories,isLoading: isCaseCategorLoading,isError: isCaseCategoryError} = useGetAllCaseCategories({
        pageNumber: aidPage,
        SearchValue: aidDebounceValue,
    });
    const tablehead = useMemo(() => familyTablehead, [])
    const queryClient = useQueryClient();
    const familyEnumFilterArr = useMemo(() => familyEnumFilter, [])
    const filterValsArr = useMemo(() => filterVals, [])

    const handleCategorySelect = (category) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            categoryId: category ? category.id : undefined
        }));
    };

    return (
        <Layout headerText={'إدارة العائلات'}>
            <div className="container py-10">
                <div className="title flex flex-col gap-4 my-8">
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>
                        قائمة العائلات
                        </h2>
                        <Button className={'bg-secondary p-2'}>
                            <Link to={'/families/add'} className='flex items-center'>
                                <Plus size={15} className=''/>
                                <span className='mr-2'>إضافة عائلة</span>
                            </Link>
                        </Button>
                    </div>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                        <div className="filters flex items-center gap-4">
                            <EnumFilter
                                data={familyEnumFilterArr}
                                text={'القرار'}
                                setFilter={setFilter}
                                filter={filter}
                                propertyName={'decision'}
                            />

                            <CategoryListFilter
                                setCategoryName={handleCategorySelect}
                                response={caseCategories}
                                isLoading={isCaseCategorLoading}
                                isError={isCaseCategoryError}
                                setPage={setAidPage}
                                setCatDebounceValue={setAidDebounceValue}
                                text={'تصنيف الحاله'}
                            />

                            <FilterVals
                                data={filterValsArr}
                                value={searchColumn}
                                setFilter={setSearchColumn}
                            />

                        </div>
                    </div>
                </div>
                <div className="family-items bg-white rounded-md shadow p-4">
                    {
                        isLoading ?
                        <div className='flex items-center justify-center h-screen'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <Empty message="حدث خطأ في تحميل البيانات" />
                        :
                        families?.items?.length === 0 ?
                        <Empty message="لا يوجد عائلات حتى الان" />
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
                                    {families?.items?.map((family) => (
                                    <TableRow key={family.id} className="text-center">
                                        <TableCell className={'p-6'}>{family?.name || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{family?.primaryReceiverName || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>{family?.region || 'لا يوجد'}</TableCell>
                                        <TableCell className={'p-6'}>
                                            <div className='flex flex-col gap-1 items-center justify-center'>
                                                {
                                                    family?.categories?.length === 0 ? (
                                                        <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                                                            لا يوجد
                                                        </span>
                                                    )
                                                    :
                                                    <span className="px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                                                        {family?.categories[0].name} {`${family?.categories?.length>=2 ? `+ ${family?.categories?.length-1}`: ''}` }
                                                    </span>

                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell className={'p-6'}>{family?.casesCount || 0}</TableCell>
                                        <TableCell className={'p-6'}>
                                            {family?.hasSocialAssessment ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                                                    نعم
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                                                    لا
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className={'p-6'}>
                                            {family?.hasFinancialBudget ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                                                    نعم
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                                                    لا
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className={'p-6'}>
                                            {family?.decision === 'Accepted' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                                                    مقبول
                                                </span>
                                            ) : family?.decision === 'Rejected' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-red-100 text-red-800">
                                                    مرفوض
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-800">
                                                    قيد الانتظار
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(family?.createdOn), 'yyyy-MM-dd')}</TableCell>
                                        {/* <TableCell className={'p-6'}>{family?.updatedOn ? format(new Date(family?.updatedOn), 'yyyy-MM-dd') : format(new Date(family?.createdOn), 'yyyy-MM-dd')}</TableCell> */}
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                <Link to={`/families/${family.id}`}>
                                                    <Eye size={16} className='text-primary'/>
                                                </Link>
                                                <Link to={`/families/edit`} state={{data:family,edit:true}}>
                                                    <Pen size={16} className='text-secondary'/>
                                                </Link>
                                                <DeleteModel
                                                message="هل أنت متأكد من حذف هذه العائلة؟"
                                                wait={isPending}
                                                deleteFun={() => {
                                                    deleteFamily(family.id, {
                                                        onSuccess: () => {
                                                            queryClient.invalidateQueries({ queryKey: ['families'] })
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
                            <Pagination setPage={setPage} response={families} />
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Families