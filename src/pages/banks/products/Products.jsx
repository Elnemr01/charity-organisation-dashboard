import Layout from '@/appComponents/layout/Layout';
import Loading from '@/appComponents/models/Loading';
import Pagination from '@/appComponents/pagination/Pagination';
import TextSearch from '@/appComponents/search/TextSearch';
import useGetAllProductItems from '@/hooks/banks/useGetAllProductItems'
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
import useDeleteProductItem from '@/hooks/banks/useDeleteProductItem';

const Products = () => {
    const [page, setPage] = useState(1);
    const [debounceValue, setDebounceValue] = useState('');
    const {productItems, isLoading, isError} = useGetAllProductItems({page,debounceValue});
    const {deleteProductItem, isPending} = useDeleteProductItem();
    const tablehead= useMemo(()=> productTablehead,[])
    // console.log(productItems)

    return (
        <Layout headerText={'اداره المخازن'}>
            <div className="container">
                <div className="title flex flex-col gap-4 my-8">
                    <h2 className='text-xl font-semibold'>
                        مخزن العينيات :
                    </h2>
                    <div className="search">
                        <TextSearch setDebounceValue={setDebounceValue} />
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
                        <div className='bg-white rounded-md shadow p-4'>
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
                                        <TableCell className={'p-6'}>{product?.amount || 5}</TableCell>
                                        <TableCell className={'p-6'}>{product?.unitName}</TableCell>
                                        <TableCell className={'p-6'}>{product?.categoryName}</TableCell>
                                        <TableCell className={'p-6'}>{product?.purposeName}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 justify-center">
                                                {/* <Link to={`/banks/products/${product.id}`}>
                                                    <Eye size={16} className='text-primary'/>
                                                </Link> */}
                                                <Link to={`/banks/products/add`} state={{edit: true,data: product}}>
                                                    <Pen size={16} className='text-secondary'/>
                                                </Link>
                                                <DeleteModel
                                                message="هل أنت متأكد من حذف هذا المنتج؟"
                                                wait={isPending}
                                                deleteFun={() => deleteProductItem(product.id)}
                                                >
                                                    <Trash2 size={16} className='text-red-500'/>
                                                </DeleteModel>
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