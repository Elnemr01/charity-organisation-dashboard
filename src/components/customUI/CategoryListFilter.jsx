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

const CategoryListFilter = ({setCategoryName,response,isLoading,isError,setPage,setCatDebounceValue
    ,text
}) => {
    const [val,setVal]=useState(null)
    return (
        <DropdownMenu dir='rtl'>
            <DropdownMenuTrigger render={<Button variant="outline"
            className={" hover:text-secondary rounded-full text-secondary border-secondary border"}>
                {val ? val : text ? text : 'تصفيه'}
            </Button>} />
            <DropdownMenuContent className="w-40" align="center" dir='rtl'>
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoryListFilter