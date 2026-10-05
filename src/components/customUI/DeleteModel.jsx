import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'

const DeleteModel = ({children,message,wait,deleteFun}) => {
    return (
        <Dialog dir="rtl">
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader className={'text-center'}>
                    <DialogTitle>{message}</DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex items-center justify-center">
                    <DialogClose render={<Button type="button" className={'bg-neutral hover:bg-neutral text-white'}>الغاء</Button>} />
                    <Button type="button" onClick={deleteFun} disabled={wait} className={'bg-red-500 hover:bg-red-500 '}>
                        {wait ? 'جاري الحذف...' : 'حذف'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteModel