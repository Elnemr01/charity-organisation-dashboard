import Layout from '@/appComponents/layout/Layout';
import useGetFamilyById from '@/hooks/families/useGetFamilyById';
import { useParams, Link } from 'react-router';
import { useMemo } from 'react';
import Loading from '@/appComponents/models/Loading';
import Empty from '@/appComponents/models/Empty';

import { familyDecision } from '@/constants/families/familyConst';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Pen, Eye, Trash2 } from 'lucide-react';
import { caseTablehead } from '@/constants/cases/caseConst';
import { maritalStatusObj, relationToFamiltObj } from '@/constants/families/familyEnums';
import DeleteModel from '@/components/customUI/DeleteModel';
import useDeleteCase from '@/hooks/cases/useDeleteCase';

const FamilyDetails = () => {
    const { id } = useParams();
    const { family, isLoading, isError } = useGetFamilyById({ id: Number(id) });
    const {deleteCase,isPending}=useDeleteCase();

    const maritalStatus = useMemo(()=> maritalStatusObj,[])
    const relationToFamily = useMemo(()=> relationToFamiltObj,[])

    const getLabel = (value) => {
        if (value === null || value === undefined || value === '') return 'لا يوجد';
        return value;
    };

    const getBooleanLabel = (value) => {
        if (value === true) return 'نعم';
        if (value === false) return 'لا';
        return 'لا يوجد';
    };


    const tablehead = useMemo(() => [
        'الاسم',
        'الرقم القومي',
        'العمر',
        'الحالة الاجتماعية',
        'العمل',
        'الحالة الصحية',
        'الصلة بالعائلة',
        'رقم الهاتف',
        'الفئات',
        'تاريخ الإنشاء',
        'الإجراءات',
    ], []);

    return (
        <Layout headerText={'تفاصيل العائلة'}>
            <div className="container py-10">
                {
                    isLoading ?
                    <div className='flex items-center justify-center h-screen'>
                        <Loading />
                    </div>
                    :
                    isError ?
                    <Empty message="حدث خطأ في تحميل البيانات" />
                    :
                    !family ?
                    <Empty message="العائلة غير موجودة" />
                    :
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">{family?.name || 'بدون اسم'}</h2>
                                <Link to={`/families/edit`} state={{ data: family, edit: true }} 
                                >
                                    <Button variant="outline" className="gap-2 bg-secondary text-white hover:text-white cursor-pointer">
                                        <Pen size={16} /> تعديل العائلة
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">اسم العائلة</label>
                                    <p className="text-lg font-medium">{getLabel(family?.name)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">المستفيد الرئيسي</label>
                                    <p>{getLabel(family?.primaryReceiverName)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">المنطقة</label>
                                    <p>{getLabel(family?.region)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">العنوان</label>
                                    <p>{getLabel(family?.address)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">المبلغ النقدي المطلوب</label>
                                    <p>{getLabel(family?.cashRequired)}</p>
                                </div>

                                

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">عدد الحالات</label>
                                    <p>{getLabel(family?.casesCount)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">الأصناف المطلوبة</label>
                                    <p>{getLabel(family?.requiredItemsCount)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">لديه تقييم اجتماعي</label>
                                    <p>{getBooleanLabel(family?.hasSocialAssessment)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">لديه جدول دخل وإنفاق</label>
                                    <p>{getBooleanLabel(family?.hasFinancialBudget)}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">المساعدات الموزعة</label>
                                    <p>{getLabel(family?.distributedAidsCount)}</p>
                                </div>


                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">القرار</label>
                                    <p>
                                        {family?.decision ? (
                                            <span className={family.decision === 'Accepted' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800' :
                                                family.decision === 'Rejected' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-red-100 text-red-800' :
                                                    'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-800'}>
                                                {familyDecision[family.decision] || family.decision}
                                            </span>
                                        ) : (
                                            'لا يوجد'
                                        )}
                                    </p>
                                </div>
                            </div>
                            {/*  */}
                            <div className="space-y-2 my-4 flex flex-col gap-2">
                                <label className=" text-gray-500">تصنيفات العائلة</label>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        family?.categories?.length > 0 ? (
                                            family.categories.map((cat, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {cat.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                                                لا يوجد
                                            </span>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="space-y-2 my-4 flex flex-col gap-2">
                                <label className="text text-gray-500"> اسباب الرفض او القبول</label>
                                <p>{getLabel(family?.decisionReason)}</p>
                            </div>


                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className='flex items-center justify-between'>
                                <h2 className="text-xl font-semibold mb-6">أفراد العائلة (الحالات)</h2>
                                <Button className={'bg-secondary'}>
                                    <Link to={`/cases/add`} state={{ familyId: family?.id }}>
                                        إضافة حالة جديدة
                                    </Link>
                                </Button>
                            </div>
                            {
                                family?.cases?.length === 0 ? (
                                    <Empty message="لا يوجد حالات لهذه العائلة" />
                                ) : (
                                    <div className='overflow-x-auto'>
                                        <Table className={'p-4 '}>
                                            <TableHeader>
                                                <TableRow>
                                                    {tablehead.map((head, index) => (
                                                        <TableHead key={index} className=" p-4 text-center">{head}</TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody className={""}>
                                                {family?.cases?.map((caseItem) => (
                                                <TableRow key={caseItem.id} className="text-center">
                                                    <TableCell className={'p-6'}>{caseItem?.name || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{caseItem?.nationalId || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{caseItem?.age || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{maritalStatus[caseItem?.maritalStatus] || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{caseItem?.job || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{caseItem?.healthStatus || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{relationToFamily[caseItem?.relationToFamily] || 'لا يوجد'}</TableCell>
                                                    <TableCell className={'p-6'}>{caseItem?.phone || 'لا يوجد'}</TableCell>
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
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }
            </div>
        </Layout>
    )
}

export default FamilyDetails