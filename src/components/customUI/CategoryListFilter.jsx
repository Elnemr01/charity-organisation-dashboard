import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Pagination from '@/appComponents/pagination/Pagination'
import Loading from '@/appComponents/models/Loading'
import TextSearch from '@/appComponents/search/TextSearch'
import Error from '@/appComponents/models/Error'
import Empty from '@/appComponents/models/Empty'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const CategoryListFilter = ({setCategoryName,response,isLoading,isError,setPage,setCatDebounceValue
    ,text,add,addNewItem,queryKey,addWait
}) => {



    const [val,setVal]=useState(null)
    const [inputValue,setInputValue]=useState('')
    const queryClient=useQueryClient();

    return (
        <DropdownMenu dir='rtl'>
            <DropdownMenuTrigger render={<Button variant="outline"
            className={" hover:text-secondary rounded-full text-secondary border-secondary border"}>
                {val ? val : text ? text : 'تصفيه'}
            </Button>} />
            <DropdownMenuContent className="w-50" align="center" dir='rtl'>
                <TextSearch setDebounceValue={setCatDebounceValue}/>
                <DropdownMenuGroup className={'flex flex-col gap-2 p-2 justify-center items-center w-full'}>
                    {
                        isLoading ?
                        <Loading/>
                        :
                        isError ?
                        <Error/>
                        :
                        response?.items?.length ===0 ?
                        <Empty/>
                        :
                        <>
                            {(text ==='تصفيه' || text === undefined) && <DropdownMenuItem className={'py-2 flex justify-center items-center cursor-pointer'}
                            onClick={()=>{
                                        setCategoryName({})
                                        setVal(null)
                                    }}>
                                الكل
                            </DropdownMenuItem>}
                            {response?.items?.map((item,index)=>(
                                <DropdownMenuItem key={index} className={'py-2 flex justify-center items-center cursor-pointer'}
                                onClick={()=>{
                                    setCategoryName(item)
                                    setVal(item.name)
                                }}>
                                    {item.name}
                                </DropdownMenuItem>
                            ))}
                        </>
                    }
                    
                </DropdownMenuGroup>
                <Pagination setPage={setPage} response={response}/>
                {add && <div className="add-new flex justify-center items-center p-1 gap-2 mt-4">
                    <input type="text" placeholder="إضافة جديد"
                    onChange={(event)=> setInputValue(event.target.value)}
                    className='flex-1 w-30 p-2 rounded-sm border border-secondary'/>
                    <Button variant="outline"
                    onClick={()=> {
                        if(inputValue.trim() === ''){
                            toast.error('الرجاء إدخال اسم الفئة')
                            return ;
                        }
                        addNewItem({name: inputValue},{
                            onSuccess: ()=> {
                                setInputValue('')
                                queryClient.invalidateQueries({queryKey: [queryKey]})
                            }
                        })
                    }}
                    className="add-new-button h-10 cursor-pointer text-white bg-secondary hover:bg-secondary
                    hover:text-white " disabled={addWait}>
                        +
                    </Button>
                </div>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoryListFilter