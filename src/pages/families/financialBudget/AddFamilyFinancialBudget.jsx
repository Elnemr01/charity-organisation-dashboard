import Layout from '@/appComponents/layout/Layout'
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { expenseKeys, financialBudgetTableHead, incomeKeys } from '@/constants/financialBudget/financialBudget';
import useGetAllFamilyExpenses from '@/hooks/familyExpense/useGetAllFamilyExpenses';
import Loading from '@/appComponents/models/Loading';
import Error from '@/appComponents/models/Error';
import useAddFinancialBudget from '@/hooks/financialBudget/useAddFinancialBudget';
import useEditFinancialBudget from '@/hooks/financialBudget/useEditFinancialBudget';
import { editFinancialBudgetSchema } from '@/constants/schemas/financialBudgetSchema';

const AddFamilyFinancialBudget = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { state } = useLocation();

    const edit = state?.edit;
    const data = state?.data;
    const familyId = state?.familyId;
    const cases = state?.cases;

    console.log(familyId)

    const { familyExpenses, isLoading: isLoadingExp, isError: isErrorExp } = useGetAllFamilyExpenses();
    const { addNewFinancialBudget, isPending: addPending } = useAddFinancialBudget();
    const { editFinancialBudget, isPending: editPending } = useEditFinancialBudget();

    const financialBudgetTableHeadArr = useMemo(() => financialBudgetTableHead, [])
    const incomeKeysArr = useMemo(() => incomeKeys, []);
    const expenseKeysArr = useMemo(() => expenseKeys, []);

    const numberOfEductionalCases = useCallback((type) =>
        cases?.filter((e) => e.type === type).length, [cases])

    const initialValues = useMemo(() => ({
        familyId: familyId || 1,
        fatherIncome: data?.fatherIncome || 0,
        motherIncome: data?.motherIncome || 0,
        childrenIncome: data?.childrenIncome || 0,
        pensionIncome: data?.pensionIncome || 0,
        inheritanceOrPropertiesIncome: data?.inheritanceOrPropertiesIncome || 0,
        permanentAidIncome: data?.permanentAidIncome || 0,
        temporaryAidIncome: data?.temporaryAidIncome || 0,
        otherIncome: data?.otherIncome || 0,
        basicNeedsExpenses: data?.basicNeedsExpenses || 0,
        utilitiesExpenses: data?.utilitiesExpenses || 0,
        rentExpenses: data?.rentExpenses || 0,
        medicalExpenses: data?.medicalExpenses || 0,
        basicEducationExpenses: data?.basicEducationExpenses || 0,
        higherEducationExpenses: data?.higherEducationExpenses || 0,
        debtExpenses: data?.debtExpenses || 0,
        irregularWorkEmergencyExpenses: data?.irregularWorkEmergencyExpenses || 0,
    }), []);


    const formik = useFormik({
        initialValues,
        validationSchema: editFinancialBudgetSchema,
        onSubmit: (values) => {

            if (edit) {
                editFinancialBudget({ id: data.id, data: values }, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['familyById'] });
                        navigate(-1);
                    },
                });
            } else {
                addNewFinancialBudget(values, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['familyById'] });
                        navigate(-1);
                    },
                });
            }
        },
    });





    return (
        <Layout headerText={'جدول الدخل والانفاق للعائله'}>
            <div className="container my-10 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold">
                    {
                        edit ? 'تعديل جدول الدخل والانفاق' : 'إضافة جدول دخل وانفاق'
                    }
                </h2>
                <form onSubmit={formik.handleSubmit} className='my-4'>
                    {
                        isLoadingExp ?
                        <div className='flex items-center justify-center h-[40vh]'>
                            <Loading />
                        </div>
                        :
                        isErrorExp ?
                        <Error />
                        :
                        <>
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
                                            <input type="number" id="fatherIncome" name="fatherIncome"
                                            value={formik.values.fatherIncome} onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                            {
                                                formik.errors.fatherIncome && 
                                                <span className='text-red-500 text-sm'>{formik.errors.fatherIncome}</span>
                                            }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="basicNeedsExpenses" className='flex flex-col gap-2'>
                                                <span>الضروريات ( {familyExpenses[3]?.amount || 0} للفرد )</span>
                                                <span className='text-sm'>يوجد {cases?.length || 0} حاله فى هذه العائله</span>
                                            </label>
                                            <input type="number" id="basicNeedsExpenses" name='basicNeedsExpenses'
                                            value={formik.values.basicNeedsExpenses} onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none w-50'
                                            />
                                        </div>
                                        {
                                            formik.errors.basicNeedsExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.basicNeedsExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>

                                    {/* mother and utilities */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="motherIncome" className=''>دخل الام</label>
                                            <input type="number" id="motherIncome" name='motherIncome'
                                            value={formik.values.motherIncome} onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.motherIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.motherIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="utilitiesExpenses" className=''>مياه وكهرباء للاسره</label>
                                            <input type="number" id="utilitiesExpenses" value={familyExpenses[2]?.amount || 0}
                                            className='p-2 rounded-md border border-neutral outline-none' disabled
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* children and rent */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="childrenIncome" className=''>دخل الابناء</label>
                                            <input type="number" id="childrenIncome" name='childrenIncome'
                                            value={formik.values.childrenIncome}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.childrenIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.childrenIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="rentExpenses" className=''> الايجار ( اختيارى ) </label>
                                            <input type="number" id="rentExpenses" name='rentExpenses'
                                            value={formik.values.rentExpenses}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none'
                                            />
                                        </div>
                                        {
                                            formik.errors.rentExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.rentExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>

                                {/* pension and medical */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="pensionIncome" className=''> المعاش ( اختيارى )</label>
                                            <input type="number" id="pensionIncome" name='pensionIncome'
                                            value={formik.values.pensionIncome}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.pensionIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.pensionIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="medicalExpenses" className=''> العلاج ( اختيارى ) </label>
                                            <input type="number" id="medicalExpenses" name='medicalExpenses'
                                            value={formik.values.medicalExpenses}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none'
                                            />
                                        </div>
                                        {
                                            formik.errors.medicalExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.medicalExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>

                                {/* properties and basicEducationExpenses */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="inheritanceOrPropertiesIncome" className=''> ميراث او املاك ( اختيارى )</label>
                                            <input type="number" id="inheritanceOrPropertiesIncome" name='inheritanceOrPropertiesIncome'
                                            value={formik.values.inheritanceOrPropertiesIncome}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.inheritanceOrPropertiesIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.inheritanceOrPropertiesIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="higherEducationExpenses" className='flex flex-col gap-2'>
                                                <span>تعليم ابتدائى واعدادى ( {familyExpenses[0].amount} للفرد )</span>
                                                <span className='text-sm'>يوجد {numberOfEductionalCases('PrimaryOrPreparatory') || 0} طالب فى هذه المرحله</span>
                                            </label>
                                            <input type="number" id="basicEducationExpenses" name='basicEducationExpenses'
                                            value={formik.values.basicEducationExpenses}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none'
                                            />
                                        </div>
                                        {
                                            formik?.errors.basicEducationExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.basicEducationExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>

                                {/* permanentAidIncome and higherEducationExpenses */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="permanentAidIncome" className=''> مساعدات دائمه ( اختيارى )</label>
                                            <input type="number" id="permanentAidIncome" name='permanentAidIncome'
                                            value={formik.values.permanentAidIncome}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.permanentAidIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.permanentAidIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="higherEducationExpenses" className='flex flex-col gap-2'>
                                                <span>تعليم ثانوى وجامعى ( {familyExpenses[1].amount} للفرد )</span>
                                                <span className='text-sm'>يوجد {numberOfEductionalCases('SecondaryOrUniversity') || 0} طالب فى هذه المرحله</span>
                                            </label>
                                            <input type="number" id="higherEducationExpenses" name='higherEducationExpenses'
                                            value={formik.values.higherEducationExpenses}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none'
                                            />
                                        </div>
                                        {
                                            formik.errors.higherEducationExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.higherEducationExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>

                                {/* temporaryAidIncome and debtExpenses */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="temporaryAidIncome" className=''>مساعدات مؤقته ( اختيارى )</label>
                                            <input type="number" id="temporaryAidIncome" name='temporaryAidIncome'
                                            value={formik.values.temporaryAidIncome}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.temporaryAidIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.temporaryAidIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="debtExpenses" className=''> الديون ( اختيارى ) </label>
                                            <input type="number" id="debtExpenses" name='debtExpenses'
                                            value={formik.values.debtExpenses}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none'
                                            />
                                        </div>
                                        {
                                            formik.errors.debtExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.debtExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>

                                {/* irregularWorkEmergencyExpenses and medical */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="otherIncome" className=''> اخرى ( اختيارى )</label>
                                            <input type="number" id="otherIncome" name='otherIncome'
                                            value={formik.values.otherIncome}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none bg--200'
                                            />
                                        </div>
                                        {
                                            formik.errors.otherIncome && 
                                            <span className='text-red-500 text-sm'>{formik.errors.otherIncome}</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="irregularWorkEmergencyExpenses" className=''> عماله غير منتظمه ( اختيارى ) </label>
                                            <input type="number" id="irregularWorkEmergencyExpenses" name='irregularWorkEmergencyExpenses'
                                            value={formik.values.irregularWorkEmergencyExpenses}
                                            onChange={formik.handleChange}
                                            className='p-2 rounded-md border border-neutral outline-none'
                                            />
                                        </div>
                                        {
                                            formik.errors.irregularWorkEmergencyExpenses && 
                                            <span className='text-red-500 text-sm'>{formik.errors.irregularWorkEmergencyExpenses}</span>
                                        }
                                    </TableCell>
                                </TableRow>
                                    {/* total */}
                                <TableRow>
                                    <TableCell className="">
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="otherIncome" className=''> اجمالى الدخل </label>
                                            <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                                {
                                                    incomeKeysArr.reduce((acc, key) => acc + (formik.values[key] || 0), 0)
                                                }
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='item flex justify-between items-center gap text-lg font-semibold'>
                                            <label htmlFor="irregularWorkEmergencyExpenses" className=''>اجمالى المصروفات </label>
                                            <p className='p-2 w-50 bg-tertiary rounded-md text-center'>
                                                {
                                                    expenseKeysArr.reduce((acc, key) => acc + (formik.values[key] || 0), 0)
                                                }
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                
                                
                                </TableBody>
                            </Table>
                            <div className="btns my-10 flex justify-end items-center gap-8">
                                <Button
                                    type='submit'
                                    disabled={editPending || addPending}
                                    className='bg-secondary text-white p-6 py-4'
                                >
                                    {
                                        edit ? 
                                        editPending ? 'جاري تعديل الجدول' : 'تعديل الجدول'
                                        :
                                        addPending ? 'جاري اضافه الجدول' : 'اضافه الجدول'
                                    }
                                </Button>
                                <Button
                                    type='button'
                                    className='bg-neutral text-white py-4'
                                    onClick={() => navigate(-1)}
                                    disabled={editPending || addPending}
                                >
                                    الغاء
                                </Button>
                            </div>
                        </>
                    }
                </form>

            </div>
        </Layout>
    )
}

export default AddFamilyFinancialBudget