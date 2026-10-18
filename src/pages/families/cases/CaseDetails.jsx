import Layout from '@/appComponents/layout/Layout';
import useGetCaseById from '@/hooks/cases/useGetCaseById';
import { Link, useParams } from 'react-router';
import Loading from '@/appComponents/models/Loading';
import Empty from '@/appComponents/models/Empty';
import { format } from 'date-fns';
import {
    genderObj,
    relationToFamiltObj,
    educationStatusObj,
    maritalStatusObj,
} from '@/constants/families/familyEnums';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';

const CaseDetails = () => {
    const { id } = useParams();
    const { familyCase, isLoading, isError } = useGetCaseById({ id });
    

    const gender = useMemo(()=> genderObj,[])
    const educationStatus = useMemo(()=> educationStatusObj,[])
    const relationToFamily = useMemo(()=> relationToFamiltObj,[])
    const maritalStatus = useMemo(()=> maritalStatusObj,[])

    const getLabel = (value) => {
        if (value === null || value === undefined || value === '') return 'لا يوجد';
        return value;
    };

    return (
        <Layout headerText={'تفاصيل الحالة'}>
            <div className="container py-10 mb-10">
                {
                    isLoading ?
                    <Empty message="حدث خطأ في تحميل البيانات" />
                    :
                    !familyCase ?
                    <Empty message="الحالة غير موجودة" />
                    :
                    <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">{familyCase?.name || 'بدون اسم'}</h2>
                            <Button className={'bg-secondary'}>
                                <Link to={`/families/${familyCase?.familyId}`}>
                                    تفاصيل العائله
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">الاسم</label>
                                <p className="text-lg font-medium">{getLabel(familyCase?.name)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">اللقب</label>
                                <p>{getLabel(familyCase?.nickName)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">النوع</label>
                                <p>{getLabel(gender[familyCase?.gender] || 'لا يوجد')}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">تاريخ الميلاد</label>
                                <p>{getLabel(familyCase?.birthDate ? format(new Date(familyCase.birthDate), 'yyyy-MM-dd') : '')}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">العمر</label>
                                <p>{getLabel(familyCase?.age)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">الحالة الاجتماعية</label>
                                <p>{getLabel(maritalStatus[familyCase?.maritalStatus] || 'لا يوجد')}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">العمل</label>
                                <p>{getLabel(familyCase?.job)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">الدخل</label>
                                <p>{getLabel(familyCase?.jobIncome)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">المستوى التعليمي</label>
                                <p>{educationStatus[familyCase?.educationStatus] || 'لا يوجد'}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">الحالة الصحية</label>
                                <p>{getLabel(familyCase?.healthStatus)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">الصلة بالعائلة</label>
                                <p>{relationToFamily[familyCase?.relationToFamily] || 'لا يوجد'}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">رقم الهاتف</label>
                                <p>{getLabel(familyCase?.phone)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">الرقم القومي</label>
                                <p>{getLabel(familyCase?.nationalId)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">اسم العائلة</label>
                                <p>{getLabel(familyCase?.familyName)}</p>
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">تاريخ الإنشاء</label>
                                <p>{getLabel(familyCase?.createdOn ? format(new Date(familyCase.createdOn), 'yyyy-MM-dd') : '')}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-500">تاريخ آخر تحديث</label>
                                <p>{getLabel(familyCase?.updatedOn ? format(new Date(familyCase.updatedOn), 'yyyy-MM-dd') : '')}</p>
                            </div>
                        </div>
                        <div className="space-y-2 flex flex-col gap-2 my-4">
                                <label className="text-sm text-gray-500">تصنيفات الحاله</label>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        familyCase?.categories?.length > 0 ? (
                                            familyCase.categories.map((cat, index) => (
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
                    </div>
                }
            </div>
        </Layout>
    )
}

export default CaseDetails