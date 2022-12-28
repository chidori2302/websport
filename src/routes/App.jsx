import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Accessories from '../pages/Accessories'

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/catalog/:slug' element={<Product />}/>
            <Route path='/catalog' element={<Catalog />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/accessories' component={<Accessories />}/>
        </Routes>
    )
}

export default App
