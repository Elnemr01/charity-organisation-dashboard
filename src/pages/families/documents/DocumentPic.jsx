import Layout from '@/appComponents/layout/Layout'
import Error from '@/appComponents/models/Error';
import Loading from '@/appComponents/models/Loading';
import DeleteModel from '@/components/customUI/DeleteModel';
import { Button } from '@/components/ui/button';
import useDeleteDocument from '@/hooks/documents/useDeleteDocument';
import useGetDocument from '@/hooks/documents/useGetDocument';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Trash2 } from 'lucide-react';
import React, { useCallback, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router';

const DocumentPic = () => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {document}=state;

    const {fileUrl,isLoading,isError} = useGetDocument(document?.id);
    const {deleteDocument,isPending}= useDeleteDocument(document?.id);

    const downloadLink = useRef(null)
    const queryClient=useQueryClient();

    const handleDownload = useCallback(() => {
        if (downloadLink.current) {
            downloadLink.current.click();
        }
    },[downloadLink]);


    return (
        <Layout headerText={'اداره العائلات'}>
            <div className="container my-10 p-4 bg-white rounded-md flex items-center justify-center flex-col">
                {
                    isLoading ?
                    <div className="flex items-center justify-center h-[50vh]">
                        <Loading/>
                    </div>
                    :
                    isError ?
                    <Error/>
                    :
                    fileUrl &&
                    <>
                        <div className="title flex items-center justify-between w-full mb-8">
                            <h2 className='text-lg font-bold text-neutral my-4'>{document?.name || 'اسم المستند'}</h2>
                            <div className="btns flex items-center gap-4">
                                <DeleteModel
                                message={"هل انت متأكد من حذف هذا المرفق"}
                                wait={isPending}
                                deleteFun={()=> {
                                    deleteDocument(document.id,{
                                        onSuccess: ()=> {
                                            queryClient.invalidateQueries(['familyById'])
                                            navigate(-1)
                                        }
                                    })
                                }}
                                >
                                    <Button className={'bg-red-500 text-white border border-red-500'}>
                                        <Trash2 size={16} className='text-white '/>
                                        <span>حذف</span>
                                    </Button>
                                </DeleteModel>
                                <>
                                <Button className={'bg-secondary text-white border border-secondary'}
                                onClick={handleDownload}
                                >
                                    <Download size={20} className='text-white '/>
                                    <span>تنزيل</span>
                                </Button>
                                <a href={fileUrl} download className='hidden' ref={downloadLink}>
                                    <Download size={20} className='text-secondary cursor-pointer' />
                                </a>
                                </>
                
                            </div>
                        </div>
                        <img src={`${fileUrl}`} alt="صوره المرفق" loading='lazy' />
                    </>
                }
            </div>
        </Layout>
    )
}

export default DocumentPic