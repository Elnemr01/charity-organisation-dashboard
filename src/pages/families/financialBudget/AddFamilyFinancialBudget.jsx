import Layout from '@/appComponents/layout/Layout'
import { useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router';

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { financialBudgetTableHead } from '@/constants/financialBudget/financialBudget';

const AddFamilyFinancialBudget = () => {

    const navigate = useNavigate();
    const queryClient=useQueryClient();
    const {state}=useLocation();

    const edit=state?.edit;
    const data=state?.data;
    const familyId=state?.familyId;


    const financialBudgetTableHeadArr=useMemo(()=> financialBudgetTableHead,[])




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
                                        <TableHead className={"text-center font-semibold p-4"}>{e}</TableHead>
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Wireless Mouse</TableCell>
                            <TableCell>$29.99</TableCell>
                            <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                    Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Mechanical Keyboard</TableCell>
                            <TableCell>$129.99</TableCell>
                            <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                    Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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