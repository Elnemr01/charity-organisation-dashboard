import Empty from '@/appComponents/models/Empty'
import { Button } from '@base-ui/react'
import { Edit, Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const FamilyFinancialBudget = ({financialBudget,familyId,hasFinancialBudget,cases}) => {
    return (
        <section id='familyFinancialBudget' className='bg-white rounded-lg shadow p-6'>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">جدول الدخل والانفاق للعائلة</h2>
                <div className="flex items-center gap-2">
                    {
                    !hasFinancialBudget ?
                    <Link to={`/financial-budget/add`} state={{cases}}>
                        <Button variant="outline"
                        className="gap-2 text-white bg-secondary hover:text-white flex items-center rounded-md cursor-pointer p-2 py-1">
                                <Plus size={16} /> إضافة جدول دخل وانفاق
                        </Button>
                    </Link>
                    :
                    <Link to={'/financial-budget/add'}
                        state={{data:financialBudget,edit:true,familyId,cases}} >
                        <Button variant="outline"
                        className="text-white bg-neutral flex items-center  hover:text-white gap-2 rounded-md cursor-pointer p-2 py-1"
                        >
                                <Edit size={16} /> تعديل
                        </Button>
                    </Link>
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
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="fatherIncome" className=''>دخل الأب</label>
                                        <input type="number" id="fatherIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="basicNeedsExpenses" className='flex flex-col gap-2'>
                                            <span>الضروريات ( {familyExpenses[3]?.amount || 0} للفرد )</span>
                                            <span className='text-sm'>يوجد {cases?.length || 0} حاله فى هذه العائله</span>
                                        </label>
                                        <input type="number" id="basicNeedsExpenses" 
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                                {/* mother and utilities */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="motherIncome" className=''>دخل الام</label>
                                        <input type="number" id="motherIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
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
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="childrenIncome" className=''>دخل الابناء</label>
                                        <input type="number" id="childrenIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="rentExpenses" className=''> الايجار ( اختيارى ) </label>
                                        <input type="number" id="rentExpenses"
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* pension and medical */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="pensionIncome" className=''> المعاش ( اختيارى )</label>
                                        <input type="number" id="pensionIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="medicalExpenses" className=''> العلاج ( اختيارى ) </label>
                                        <input type="number" id="medicalExpenses"
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* properties and basicEducationExpenses */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="inheritanceOrPropertiesIncome" className=''> ميراث او املاك ( اختيارى )</label>
                                        <input type="number" id="inheritanceOrPropertiesIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="higherEducationExpenses" className='flex flex-col gap-2'>
                                            <span>تعليم ابتدائى واعدادى ( {familyExpenses[0].amount} للفرد )</span>
                                            <span className='text-sm'>يوجد {numberOfEductionalCases('PrimaryOrPreparatory') || 0} طالب فى هذه المرحله</span>
                                        </label>
                                        <input type="number" id="basicEducationExpenses"
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* permanentAidIncome and higherEducationExpenses */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="permanentAidIncome" className=''> مساعدات دائمه ( اختيارى )</label>
                                        <input type="number" id="permanentAidIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="higherEducationExpenses" className='flex flex-col gap-2'>
                                            <span>تعليم ثانوى وجامعى ( {familyExpenses[1].amount} للفرد )</span>
                                            <span className='text-sm'>يوجد {numberOfEductionalCases('SecondaryOrUniversity') || 0} طالب فى هذه المرحله</span>
                                        </label>
                                        <input type="number" id="higherEducationExpenses"
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* temporaryAidIncome and debtExpenses */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="temporaryAidIncome" className=''>مساعدات مؤقته ( اختيارى )</label>
                                        <input type="number" id="temporaryAidIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="debtExpenses" className=''> الديون ( اختيارى ) </label>
                                        <input type="number" id="debtExpenses"
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* irregularWorkEmergencyExpenses and medical */}
                            <TableRow>
                                <TableCell className="">
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="otherIncome" className=''> اخرى ( اختيارى )</label>
                                        <input type="number" id="otherIncome" 
                                        className='p-2 rounded-md border border-neutral outline-none bg--200'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='item flex justify-around items-center gap text-lg font-semibold'>
                                        <label htmlFor="irregularWorkEmergencyExpenses" className=''> عماله غير منتظمه ( اختيارى ) </label>
                                        <input type="number" id="irregularWorkEmergencyExpenses"
                                        className='p-2 rounded-md border border-neutral outline-none'
                                        />
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