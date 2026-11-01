import DeleteModel from '@/components/customUI/DeleteModel'
import useDeleteDocument from '@/hooks/documents/useDeleteDocument'
import { useQueryClient } from '@tanstack/react-query'
import { Download, Eye, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const DocumentCard = ({document}) => {

    const {deleteDocument,isPending}= useDeleteDocument(document?.id);
    const queryClient=useQueryClient();

    return (
        <div className="card p-4 bg-tertiary rounded-lg shadow-md flex items-center justify-between">
            <div className="title flex flex-col gap-1">
                <h2 className='text-lg font-bold text-neutral'>{document?.name || 'اسم المستند'}</h2>
                <h3 className='text-base font-semibold text-neutral'>{document?.originalFileName || 'اسم الملف الأصلي'}</h3>
            </div>
            <div className="btns flex items-center gap-4">
                <DeleteModel
                message={"هل انت متأكد من حذف هذا المرفق"}
                wait={isPending}
                deleteFun={()=> {
                    deleteDocument(document.id,{
                        onSuccess: ()=> {
                            queryClient.invalidateQueries(['familyById'])
                        }
                    })
                }}
                >
                    <Trash2 size={17} className='text-red-500 '/>
                </DeleteModel>
                <Link to={`/documents/${document?.id}`} state={{document: document}}>
                    <Eye size={20} className='text-primary cursor-pointer' />
                </Link>
                
            </div>
        </div>
    )
}

export default DocumentCard