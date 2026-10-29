import { useNavigate } from 'react-router';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { requiredItemsTableHead } from '@/constants/requiredItems/requiredItemsConst';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteProductItem from '@/hooks/productItems/useDeleteProductItem';
import { useQueryClient } from '@tanstack/react-query';
import Empty from '@/appComponents/models/Empty';

const FamilyRequiredItems = ({ requiredItems = [],familyId }) => {
    const navigate = useNavigate();
    const queryClient=useQueryClient();

    const handleNavigate = () => {
        navigate(`/families/required-items/add`, { state: { editItems: requiredItems, isEditMode: true ,familyId} });
    };

    const {deleteProductItem,isPending : isDeletePending}=useDeleteProductItem()

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">المساعدات العينيه المطلوبه </h2>
                <div className="flex items-center gap-2">
                    {
                        requiredItems.length <= 0 ?
                            <Button variant="outline" onClick={handleNavigate}
                            className="gap-2 text-white bg-secondary hover:text-white cursor-pointer">
                                <Plus size={16} /> إضافة صنف
                            </Button>
                        : 
                        <Button variant="outline" 
                        className="text-white bg-neutral hover:text-white gap-2 cursor-pointer"
                        onClick={handleNavigate} >
                            <Edit size={16} /> تعديل
                        </Button>
                    }
                </div>
            </div>

            {requiredItems.length === 0 ? (
                <Empty text={'لا توجد مساعدات عينيه مطلوبه'}/>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="p-4">
                        <TableHeader>
                            <TableRow>
                                {requiredItemsTableHead.map((head, index) => (
                                    <TableHead key={index} className="p-4 text-center">{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="">
                            {requiredItems.map((item) => (
                                <TableRow key={item.id} className="text-center">
                                    <TableCell className="p-4">{item.amount || 'لا يوجد'}</TableCell>
                                    <TableCell className="p-4">{item.unitName || 'لا يوجد'}</TableCell>
                                    <TableCell className="p-4">{item.productCategoryName || 'لا يوجد'}</TableCell>
                                    <TableCell className="p-4">{item.donationPurposeName || 'لا يوجد'}</TableCell>
                                    <TableCell className="p-4">
                                        <div className="flex items-center gap-2 justify-center">
                                            <DeleteModel
                                            message={"هل انت متأكد من حذف هذا المنتج "}
                                            wait={isDeletePending}
                                            deleteFun={() => 
                                                deleteProductItem(item.id,{
                                                    onSuccess: () => {
                                                        queryClient.invalidateQueries({ queryKey: ['familyById'] });
                                                    }
                                                })
                                            }
                                            >
                                            <Trash2 size={16} className='text-red-500'/>
                                            </DeleteModel>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default FamilyRequiredItems;