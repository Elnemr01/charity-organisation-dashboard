import Empty from '@/appComponents/models/Empty'
import { Button } from '@base-ui/react'
import { Edit, Plus, Trash2 } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import { data, Link, useNavigate } from 'react-router'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { expenseKeys, financialBudgetTableHead, incomeKeys } from '@/constants/financialBudget/financialBudget'
import DeleteModel from '@/components/customUI/DeleteModel'
import useDeleteFinancialBudget from '@/hooks/financialBudget/useDeleteFinancialBudget'
import { useQueryClient } from '@tanstack/react-query'






const FamilyFinancialBudget = ({financialBudget,familyId,hasFinancialBudget,cases}) => {

    const financialBudgetTableHeadArr = useMemo(() => financialBudgetTableHead, []);
    const incomeKeysArr = useMemo(() => incomeKeys, []);
    const expenseKeysArr = useMemo(() => expenseKeys, []);

    const queryClient=useQueryClient();
    const {deleteFinancialBudget,isPending:deletePending}=useDeleteFinancialBudget();

    const numberOfEductionalCases = useCallback((type) =>
            cases?.filter((e) => e.type === type).length, [cases])

    return (
        <section id='familyFinancialBudget' className='bg-white rounded-lg shadow p-6'>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">جدول الدخل والانفاق للعائلة</h2>
                <div className="flex items-center gap-2">
                    {
                    !hasFinancialBudget ?
                    <Link to={`/financial-budget/add`} state={{cases,familyId}}>
                        <Button variant="outline"
                        className="gap-2 text-white bg-secondary hover:text-white flex items-center rounded-md cursor-pointer p-2 py-1">
                                <Plus size={16} /> إضافة جدول دخل وانفاق
                        </Button>
                    </Link>
                    :
                    <>
                    <DeleteModel
                        message={'هل انت متأكد من حذف هذا الجدول'}
                        wait={deletePending}
                        deleteFun={()=> {
                            deleteFinancialBudget(financialBudget?.id, {
                                onSuccess: ()=> {
                                    queryClient.invalidateQueries({queryKey:['familyById']})
                                }
                            })
                            
                        }}
                    >
                        <Button variant="outline"
                        className="text-white bg-red-600 flex items-center  hover:text-white gap-2 rounded-md cursor-pointer p-2 py-1"
                        >
                            <Trash2 size={16} /> حذف
                        </Button>
                    </DeleteModel>
                    <Link to={'/financial-budget/add'}
                        state={{data:financialBudget,edit:true,familyId,cases}} >
                        <Button variant="outline"
                        className="text-white bg-neutral flex items-center  hover:text-white gap-2 rounded-md cursor-pointer p-2 py-1"
                        >
                                <Edit size={16} /> تعديل
                        </Button>
                    </Link>
                    </>
                    }
                </div>
            </div>
            {
                !hasFinancialBudget ?
                (<Empty  text={'هذه العائله ليس لديها جدول دخل وانفاق'}/>)
                :
                <div className="financial-budget">
                    <Table className={'p-4'}>
                        <TableHeader>
                            <TableRow className={'text-lg'}>
                                {
                                    financialBudgetTableHeadArr.map((e,i)=> 
                                        <TableHead key={i} className={"text-center font-semibold p-4"}>{e}</TableHead>
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                            <TableBody>

                                {/* father and basic needs */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="fatherIncome" className=''>دخل الأب</label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.fatherIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="basicNeedsExpenses" className='flex flex-col gap-2'>
                                            <span>الضروريات</span>
                                            <span className='text-sm'>يوجد {cases?.length || 0} حاله فى هذه العائله</span>
                                        </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.basicNeedsExpenses || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>

                                {/* mother and utilities */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="motherIncome" className=''>دخل الام</label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.motherIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="utilitiesExpenses" className=''>مياه وكهرباء للاسره</label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.utilitiesExpenses || 0
                                            }
                                        </p>
                                        
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* children and rent */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="childrenIncome" className=''>دخل الابناء</label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.childrenIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="rentExpenses" className=''> الايجار </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.rentExpenses || 0
                                            }
                                        </p>

                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* pension and medical */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="pensionIncome" className=''> المعاش</label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.pensionIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="medicalExpenses" className=''> العلاج </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.medicalExpenses || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* properties and basicEducationExpenses */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="inheritanceOrPropertiesIncome" className=''> ميراث او املاك</label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.inheritanceOrPropertiesIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="basicEducationExpenses" className='flex flex-col gap-2'>
                                            <span>تعليم ابتدائى واعدادى</span>
                                            <span className='text-sm'>يوجد {numberOfEductionalCases('PrimaryOrPreparatory') || 0} طالب فى هذه المرحله</span>
                                        </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.basicEducationExpenses || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* permanentAidIncome and higherEducationExpenses */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="permanentAidIncome" className=''> مساعدات دائمه </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.permanentAidIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="higherEducationExpenses" className='flex flex-col gap-2'>
                                            <span>تعليم ثانوى وجامعى</span>
                                            <span className='text-sm'>يوجد {numberOfEductionalCases('SecondaryOrUniversity') || 0} طالب فى هذه المرحله</span>
                                        </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.higherEducationExpenses || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* temporaryAidIncome and debtExpenses */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="temporaryAidIncome" className=''>مساعدات مؤقته </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.temporaryAidIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="debtExpenses" className=''> الديون </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.debtExpenses || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* irregularWorkEmergencyExpenses and medical */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="otherIncome" className=''> اخرى </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.otherIncome || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="irregularWorkEmergencyExpenses" className=''> عماله غير منتظمه  </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                financialBudget?.irregularWorkEmergencyExpenses || 0
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                                    {/* total */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="otherIncome" className=''> اجمالى الدخل </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                incomeKeysArr.reduce((acc, key) => acc + (financialBudget[key] || 0), 0)
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                        <label htmlFor="irregularWorkEmergencyExpenses" className=''>اجمالى المصروفات </label>
                                        <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                            {
                                                expenseKeysArr.reduce((acc, key) => acc + (financialBudget[key] || 0), 0)
                                            }
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                            
                            
                            </TableBody>
                    </Table>
                </div>
            }
        </section>
    )
}

export default FamilyFinancialBudget