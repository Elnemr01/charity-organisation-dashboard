import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const FilterVals = ({data,setFilter}) => {
    const [value,setValue]=useState("تصفيه");
    return (
            <DropdownMenu dir='rtl'>
                <DropdownMenuTrigger render={<Button variant="outline"
                className={" hover:text-secondary rounded-full text-secondary border-secondary border"}>
                    {value}
                </Button>} />
                <DropdownMenuContent className="w-40" align="center" dir='rtl'>
                    <DropdownMenuGroup className={'flex flex-col gap-2 p-2 justify-center items-center w-full'}>
                        {data.map((item,index)=>(
                            <DropdownMenuItem key={index} className={'py-2 flex justify-center items-center cursor-pointer'}
                            onClick={()=>{
                                setFilter(item)
                                setValue(item.name)
                            }}>
                                {item.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
}

export default FilterVals