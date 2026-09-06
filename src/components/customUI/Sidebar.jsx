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



export function MySidebar() {
    const btns= useMemo(()=> sidebarBtns,[])
    return (
        <Sidebar className="bg-white">
            <div className="butns bg-white h-full p-4 ">
                <div className="logo w-20 flex items-center justify-center mx-auto">
                    <img src="./zad-logo.jpeg" alt="zad logo" loading='lazy'/>
                </div>
                <div className="links flex flex-col gap-2 mt-6">
                    {
                        btns.map((btn,index)=> {
                            const Icon = btn.icon

                            if(!btn.isParent) {
                                return (
                                    <NavLink key={index} to={btn.href} className="flex items-center gap-2 p-2 rounded font-semibold ">
                                        <Icon className="w-5 h-5"/>
                                        <span>{btn.label}</span>
                                    </NavLink>
                                )
                            }
                            else {
                                
                            }
                        })
                    }
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
                <SidebarTrigger className={'absolute right-5 top-12 p-4 rounded-full bg-primary/20 hover:bg-primary cursor-pointer'}/>
                {children}
            </main>
        </SidebarProvider>
    )
}