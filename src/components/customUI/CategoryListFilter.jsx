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

const CategoryListFilter = ({setId,response,isLoading,isError,setPage}) => {
    const [val,setVal]=useState(null)
    return (
        <DropdownMenu dir='rtl'>
            <DropdownMenuTrigger render={<Button variant="outline"
            className={" hover:text-secondary rounded-full text-secondary border-secondary border"}>
                {val ? val :'تصفيه'}
            </Button>} />
            <DropdownMenuContent className="w-40" align="center">
                <DropdownMenuGroup className={'flex flex-col gap-2 p-2 justify-center items-center w-full'}>
                    <DropdownMenuItem className={'py-2 flex justify-center items-center cursor-pointer'}
                    onClick={()=>{
                                setId(null)
                                setVal(null)
                            }}>
                        الكل
                    </DropdownMenuItem>
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
                        response?.items?.map((item,index)=>(
                            <DropdownMenuItem key={index} className={'py-2 flex justify-center items-center cursor-pointer'}
                            onClick={()=>{
                                setId(item.id)
                                setVal(item.name)
                            }}>
                                {item.name}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
                <Pagination setPage={setPage} response={response}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoryListFilter