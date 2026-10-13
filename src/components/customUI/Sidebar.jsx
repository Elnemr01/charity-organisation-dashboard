import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { sidebarBtns } from "@/constants/data/SidbarBtns"
import { useMemo } from "react"
import { NavLink } from "react-router"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { assets } from "@/assets/assets"
import { LogOut, LogOutIcon } from "lucide-react"
import useLogout from "@/hooks/auth/useLogout"



export function MySidebar() {
    const btns= useMemo(()=> sidebarBtns,[])
    const { logout,isPending } = useLogout();
    return (
        <Sidebar className="bg-white h-screen">
            <div className="butns bg-white h-screen p-4 ">
                <div className="logo w-20 flex items-center justify-center mx-auto">
                    <img src={assets.zadLogo} alt="zad logo" loading='lazy'/>
                </div>
                <div className="flex flex-col justify-between items-between flex-1">
                    <div className="links flex flex-col gap mt-6">
                        {
                            btns.map((btn,index)=> {
                                const Icon = btn.icon

                                if(!btn.isParent) {
                                    return (
                                        <NavLink key={index} to={btn.href} className="flex items-center mt-2 text-base gap-2 p-2 rounded font-semibold ">
                                            <Icon className="w-5 h-5"/>
                                            <span>{btn.label}</span>
                                        </NavLink>
                                    )
                                }
                                else {
                                    return (
                                    <Accordion dir="rtl" key={index} className={'flex justify-between w-full p-0'}>
                                        <AccordionItem>
                                            <AccordionTrigger className={"cursor-pointer p-0 mt-2"}>
                                                <Icon className="w-5 h-5"/>
                                                <span>{btn.label}</span>
                                            </AccordionTrigger>
                                            <AccordionContent >
                                                {
                                                    btn.children.map((childBtn,childIndex)=> {
                                                        const ChildIcon = childBtn.icon
                                                        return (
                                                            <NavLink key={childIndex} to={childBtn.href} className=" 
                                                            flex items-center text-sm gap-2 p-2 rounded font-semibold ">
                                                                <ChildIcon className="w-4 h-4"/>
                                                                <span>{childBtn.label}</span>
                                                            </NavLink>
                                                        )
                                                    })
                                                }
                                            </AccordionContent>
                                        </AccordionItem>
                                        </Accordion>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="logout bg-red-200 text-red-500 mt-50 rounded-md flex text-base
                    items-center gap-2 p-2 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                    onClick={logout}
                    >
                        <LogOutIcon size={18} className=""/>
                        <span>
                            {
                                isPending ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'
                            }
                        </span>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}


export function SidebarLayout({ children }) {
    return (
        <SidebarProvider className={"bg-white"}>
            <MySidebar />
            <main >
                <SidebarTrigger className={'absolute right-5 top-20 p-4 rounded-full bg-primary/20 hover:bg-primary cursor-pointer'}/>
                {children}
            </main>
        </SidebarProvider>
    )
}