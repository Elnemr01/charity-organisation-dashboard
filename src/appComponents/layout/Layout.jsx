import React from 'react'
import Header from '../header/Header'
import { SidebarLayout } from '@/components/customUI/Sidebar'

const Layout = ({children,headerText}) => {
    return (
        <div className="main-layout flex bg-tertiary">
            <SidebarLayout className="fixed top-0 left-0 h-full z-50"/>
            <section className="main-content flex-1">
                <Header headerText={headerText} />
                <div className="page-content pt-25">
                    {children}
                </div>  
            </section>
        </div>
    )
}

export default Layout