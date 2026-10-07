import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllProductItems from '@/hooks/banks/products/useGetAllProductItems'
import React, { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { productTablehead } from '@/constants/banks/bankConst';
import Empty from '@/appComponents/models/Empty';
import { Link } from 'react-router';
import { Eye, Pen, Trash2 } from 'lucide-react';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteProductItem from '@/hooks/banks/products/useDeleteProductItem';
import CategoryListFilter from '@/components/customUI/CategoryListFilter';
import useGetAllProductCategories from '@/hooks/categories/products/useGetAllProductCategories';
import EquelModel from '@/components/customUI/EquelModel';
import useEquelProductItem from '@/hooks/banks/products/useEquelProductItem';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const Products = () => {
    const [page, setPage] = useState(1);
    const [catPage,setCatPage] = useState(1);
    const [newAmount, setNewAmount] = useState(0);
    const [categoryName, setCategoryName] = useState(null);
    const [debounceValue, setDebounceValue] = useState('');
    const [catDebounceValue, setCatDebounceValue] = useState('');
    const {productItems, isLoading, isError} = useGetAllProductItems({
        pageNumber : page,
        SearchValue : debounceValue || categoryName
    });
    const {deleteProductItem, isPending} = useDeleteProductItem();
    const tablehead= useMemo(()=> productTablehead,[])

    const {productCategories, isLoading: isLoadingCategories, isError: isErrorCategories} = useGetAllProductCategories({
        page: catPage,
        searchValue: catDebounceValue
    });
    const queryClient = useQueryClient();
    const {equelProductItem, isPending: isEquelPending} = useEquelProductItem();




    return (
        <Layout headerText={'اداره المخازن'}>
            <div className="container">
                <div className="title flex flex-col gap-4 my-8">
                    <h2 className='text-xl font-semibold'>
                        مخزن العينيات :
                    </h2>
                    <div className="search flex items-center justify-between gap-4">
                        <TextSearch setDebounceValue={setDebounceValue} />
                        <CategoryListFilter
                            setCatDebounceValue={setCatDebounceValue}
                            setCategoryName={setCategoryName}
                            response={productCategories}
                            isLoading={isLoadingCategories}
                            isError={isErrorCategories}
                            setPage={setCatPage}
                        />
                    </div>
                </div>
                <div className="product-items bg-white rounded-md shadow p-4">
                    {
                        isLoading ? 
                        <div className='flex items-center justify-center h-screen'>
                            <Loading />
                        </div>
                        :
                        isError ?
                        <Error/>
                        :
                        productItems?.items?.length === 0 ?
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
                                    {productItems?.items?.map((product) => (
                                    <TableRow key={product.id} className="text-center">
                                        <TableCell className={'p-6'}>{product?.id}</TableCell>
                                        <TableCell className={'p-6'}>{product?.amount || 0}</TableCell>
                                        <TableCell className={'p-6'}>{product?.productItem.unitName}</TableCell>
                                        <TableCell className={'p-6'}>{product?.productItem.categoryName}</TableCell>
                                        <TableCell className={'p-6'}>{product?.productItem.purposeName}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(product?.lastUpdated), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell className={'p-6'}>{format(new Date(product?.lastUpdated), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                {/* <Link to={`/banks/products/${product.id}`}>
                                                    <Eye size={16} className='text-primary'/>
                                                </Link> */}
                                                {/* <Link to={`/banks/products/add`} state={{edit: true,data: product}}>
                                                    <Pen size={16} className='text-secondary'/>
                                                </Link> */}
                                                <DeleteModel
                                                message="هل أنت متأكد من حذف هذا المنتج؟"
                                                wait={isPending}
                                                deleteFun={() => {
                                                    deleteProductItem(product.id,{
                                                        onSuccess: ()=> {
                                                            queryClient.invalidateQueries({queryKey: ['productItems']})
                                                        }
                                                    })
                                                }}
                                                >
                                                    <Trash2 size={16} className='text-red-500'/>
                                                </DeleteModel>
                                                <EquelModel
                                                message="هل تريد تسويه هذا المنتج بعد عمليه الجرد؟"
                                                wait={isEquelPending}
                                                onChange={setNewAmount}
                                                amount={product?.amount}
                                                equelFun={() => {
                                                    equelProductItem({id: product.id,data:{newAmount}}, {
                                                        onSuccess: ()=> {
                                                            queryClient.invalidateQueries({queryKey: ['productItems']})
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
                            <Pagination setPage={setPage} response={productItems}/>
                        </div>
                        
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Products