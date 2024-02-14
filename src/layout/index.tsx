
import { Navbar } from '@/components'
import React from 'react'
import { LayoutProps } from './layout.props'

const Layout = ({children}: LayoutProps) => {
  return (
    <>
    <Navbar/>
    <div className='container'>    
    {children}
    
    </div>
    </>
  )
}

export default Layout