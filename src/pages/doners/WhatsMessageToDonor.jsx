import { useFormik } from 'formik';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';


const WhatsMessageToDonor = ({children,phone,donorId,name}) => {

    const formik = useFormik({
        initialValues: {
            message: "",
        },
        onSubmit: (values) => {
            if(!values?.message) {
                toast.error('الرجاء إدخال الرسالة');
                return;
            }
            const url = `https://wa.me/2${phone}?text=${encodeURIComponent(values?.message)}`;
            window.open(url, "_blank");
        },
    });


    return (
        <Dialog dir="rtl">
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className={'text-lg'}>إرسال رسالة واتس الى  
                        <span className='font-semibold text-secondary mx-2'>
                            {name}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4 p-4 bg-white">
                    
                    <div className='flex flex-col'>
                        <label htmlFor="message" className="block mb-2 text-lg">الرسالة</label>
                        <textarea name="message" id="message" placeholder='اكتب محتوى الرساله'
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        className="border border-gray-300 rounded-md p-2 text-lg"></textarea>
                    </div>
                    <DialogFooter className="flex items-center gap-4 mt-4 bg-white">
                        <DialogClose render={<Button type="button" variant="outline" className="text-lg">إلغاء</Button>} />
                        <Button type="submit" className="bg-secondary hover:bg-secondary text-lg">
                            فتح المتصفح للارسال
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default WhatsMessageToDonor