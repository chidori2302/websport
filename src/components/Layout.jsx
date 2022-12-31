import React from 'react'

import { Outlet } from 'react-router-dom'
import Chat from './Chat'
import Footer from './Footer'
import Header from './Header'
import ProductViewModal from './ProductViewModal'



const Layout = () => {
    return (

                    <div>
                        <Header/>
                        <div className="container">
                            <div className="main">
                                <Outlet/>
                            </div>
                        </div>
                        <Chat/>
                        <Footer/>
                        <ProductViewModal/>
                    </div>
    )
}

export default Layout
