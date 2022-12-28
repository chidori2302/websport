import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './Header'
import Chat from './Chat'
import Footer from './Footer'
import ProductViewModal from './ProductViewModal'

import App from '../routes/App'

const Layout = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route render={props => (
                    <div>
                        <Header {...props}/>
                        <div className="container">
                            <div className="main">
                                <App/>

                            </div>
                        </div>
                        <Chat/>
                        <Footer/>
                        <ProductViewModal/>
                    </div>
                )}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Layout
