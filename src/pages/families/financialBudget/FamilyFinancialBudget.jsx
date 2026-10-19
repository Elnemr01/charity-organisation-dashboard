import Empty from '@/appComponents/models/Empty'
import { Button } from '@base-ui/react'
import { Edit, Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const FamilyFinancialBudget = ({financialBudget,familyId,hasFinancialBudget}) => {
    return (
        <section id='familyFinancialBudget' className='bg-white rounded-lg shadow p-6'>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">جدول الدخل والانفاق للعائلة</h2>
                <div className="flex items-center gap-2">
                    {
                    !hasFinancialBudget ?
                    <Link to={`/financial-budget/add`}>
                        <Button variant="outline"
                        className="gap-2 text-white bg-secondary hover:text-white flex items-center rounded-md cursor-pointer p-2 py-1">
                                <Plus size={16} /> إضافة جدول دخل وانفاق
                        </Button>
                    </Link>
                    :
                    <Link to={'/financial-budget/add'}
                        state={{data:financialBudget,edit:true,familyId}} >
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
                    fffff
                </div>
            }
        </section>
    )
}

export default FamilyFinancialBudget