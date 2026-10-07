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
import toast from "react-hot-toast"
import { useRef } from "react"

const EquelModel = ({children,message,wait,equelFun,onChange,amount}) => {
    const ref= useRef();
    return (
        <Dialog dir="rtl">
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader className={'text-center'}>
                    <DialogTitle>{message}</DialogTitle>
                    <input type="number" name="newAmount"
                    className="border border-primary rounded-md p-2 mt-4"
                    id="newAmount" onChange={(e) => onChange(e.target.value)} ref={ref}/>
                </DialogHeader>
                <DialogFooter className="flex items-center justify-center bg-white border-none">
                    <DialogClose render={<Button type="button" className={'bg-red-500 hover:bg-red-500 text-white'}>الغاء</Button>} />
                    <Button type="button" onClick={()=> {
                        if(ref.current.value.trim()=== '' || parseInt(ref.current.value) <= 0) {
                            toast.error('الرجاء ادخال رقم صحيح')
                            return;
                        }
                        equelFun()
                    }} disabled={wait} className={'bg-secondary hover:bg-secondary '}>
                        {wait ? 'جاري التسويه...' : 'تسويه'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EquelModel