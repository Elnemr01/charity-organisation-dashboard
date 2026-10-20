import Layout from '@/appComponents/layout/Layout'
import { useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router';

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { financialBudgetTableHead } from '@/constants/financialBudget/financialBudget';
import useGetAllFamilyExpenses from '@/hooks/familyExpense/useGetAllFamilyExpenses';

const AddFamilyFinancialBudget = () => {

    const navigate = useNavigate();
    const queryClient=useQueryClient();
    const {state}=useLocation();

    const edit=state?.edit;
    const data=state?.data;
    const familyId=state?.familyId;
    const cases=state?.cases;

    const {familyExpenses}=useGetAllFamilyExpenses();

    const financialBudgetTableHeadArr=useMemo(()=> financialBudgetTableHead,[])

    console.log(familyExpenses)


    return (
        <Layout headerText={'جدول الدخل والانفاق للعائله'}>
            <div className="container my-10 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold">
                    {
                        edit ? 'تعديل جدول الدخل والانفاق' : 'إضافة جدول دخل وانفاق'
                    }
                </h2>
                <form 
                className='my-4'
                >
                    <Table className={'p-4'}>
                        <TableHeader>
                            <TableRow className={'text-lg'}>
                                {
                                    financialBudgetTableHead.map((e,i)=> 
                                        <TableHead key={i} className={"text-center font-semibold p-4"}>{e}</TableHead>
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        <TableRow>
                            <TableCell className="">
                                <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                    <label htmlFor="fatherIncome" className=''>دخل الأب</label>
                                    <input type="number" id="fatherIncome" 
                                    className='p-2 rounded-md border border-neutral outline-none bg--200'
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                    <label htmlFor="fatherIncome" className=''>الضروريات ( {familyExpenses[3].amount || 0} للفرد )</label>
                                    <input type="number" id="fatherIncome" 
                                    className='p-2 rounded-md border border-neutral outline-none'
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                        
                        
                        </TableBody>
                    </Table>
                </form>
                
            </div>
        </Layout>
    )
}

export default AddFamilyFinancialBudget