import Empty from '@/appComponents/models/Empty'
import { Button } from '@base-ui/react'
import { Edit, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

import DeleteModel from '@/components/customUI/DeleteModel'
import { useQueryClient } from '@tanstack/react-query'
import useDeleteSocialAssessment from '@/hooks/socialAssessment/useDeleteSocialAssessment'






const FamilySocialAssessment = ({socialAssessment,familyId,cases,hasSocialAssessment}) => {

    const queryClient=useQueryClient();
    const {deleteSocialAssessment,isPending:deletePending}=useDeleteSocialAssessment();

    return (
        <section className="social-assessment bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">البحث الاجتماعى للعائله</h2>
                <div className="flex items-center gap-2">
                    {
                    !hasSocialAssessment ?
                    <Link to={`/social-assessment/add`} state={{cases,familyId}}>
                        <Button variant="outline"
                        className="gap-2 text-white bg-secondary hover:text-white flex items-center rounded-md cursor-pointer p-2 py-1">
                                <Plus size={16} /> اضافه بحث اجتماعى
                        </Button>
                    </Link>
                    :
                    <>
                    <DeleteModel
                        message={'هل انت متأكد من حذف هذا البحث '}
                        wait={deletePending}
                        deleteFun={()=> {
                            deleteSocialAssessment(socialAssessment?.id, {
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
                    <Link to={'/social-assessment/add'}
                        state={{data:socialAssessment,edit:true,familyId,cases}} >
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
                !hasSocialAssessment ?
                (<Empty  text={'هذه العائله ليس لديها بحث اجتماعى'}/>)
                :
                <div className="">
                    social-assessment
                </div>
            }
        </section>
    )
}

export default FamilySocialAssessment