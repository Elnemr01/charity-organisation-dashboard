import DeleteModel from '@/components/customUI/DeleteModel'
import useDeleteDocument from '@/hooks/documents/useDeleteDocument'
import { useQueryClient } from '@tanstack/react-query'
import { Download, Eye, Trash2 } from 'lucide-react'
import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router'

const DocumentCard = ({document}) => {

    const downloadLink = useRef(null)
    const queryClient=useQueryClient();
    const {deleteDocument, isPending} = useDeleteDocument();

    const handleDownload = useCallback(() => {
        if (downloadLink.current) {
            downloadLink.current.click();
        }
    },[downloadLink]);

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
                    <Trash2 size={16} className="text-red-500 cursor-pointer" />
                </DeleteModel>
                <>
                <Download size={20} className='text-secondary cursor-pointer' onClick={handleDownload}/>
                <a href={document?.storedPath} download className='hidden' ref={downloadLink}>
                    <Download size={20} className='text-secondary cursor-pointer' />
                </a>
                </>
                <Link to={`/documents/${document?.id}`} state={{document: document}}>
                    <Eye size={20} className='text-primary cursor-pointer' />
                </Link>
                
            </div>
        </div>
    )
}

export default DocumentCard