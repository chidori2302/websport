import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'

const Cart = () => {
    const [typeCard, setTypeCard] = useState(undefined)

    const [numberCard, setNumberCard] = useState(undefined)

    const [ownCard, setOwnCard] = useState(undefined)

    const [dateCard, setDateCard] = useState(undefined)

    const [cvv, setCvv] = useState(undefined)

    const cartItems = useSelector((state) => state.cartItems.value)

    const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems))
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.number) * Number(item.price)), 0))
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.number), 0))
        console.log(cartItems);
    }, [cartItems])

    const check = () => {
        if (typeCard === undefined) {
            alert('Vui lòng chọn loại thẻ!')
            return false
        }
        if (numberCard === undefined) {
            alert('Vui lòng nhập số thẻ!')
            return false
        }

        if (ownCard === undefined) {
            alert('Vui lòng nhập tên!')
            return false
        }
        if (dateCard === undefined) {
            alert('Vui lòng nhập hạn thẻ!')
            return false
        }
        if (cvv === undefined) {
            alert('Vui lòng nhập cvv!')
            return false
        }
        return true
    }

    const payment = ()=>{
        if (check()) {
            alert(`Check OTP`)
        }
    }
    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            <a className='pay' data-toggle="modal" data-target="#checkoutModal">Đặt hàng</a> 
                            
                        </Button>
                        <Link to="/catalog">
                            <Button 
                                size="block"
                                
                                >
                                Tiếp tục mua hàng
                            </Button>

                        </Link>
                        
                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}/>
                            ))
                        }
                </div>
            </div>

            <div id="checkoutModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="payment-info p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4><b>Thanh toán qua thẻ</b></h4>
                        </div>
                        <span className="type d-block mt-3 mb-1">Loại thẻ</span>
                        <label className="radio"> <input type="radio" name="card" value="mastercard" checked
                            onClick={(e)=>setTypeCard(e.target.value)}
                        /> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png"/></span> </label>
                        <label className="radio"> <input type="radio" name="card" value="visa"
                            onClick={(e)=>setTypeCard(e.target.value)}
                        /> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png"/></span> </label>
                        
                        <label className="radio"> <input type="radio" name="card" value="paypal"
                            onClick={(e)=>setTypeCard(e.target.value)}
                        /> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png"/></span> </label>
                        <div className="mb-3">
                            <label className="credit-card-label">Tên chủ thẻ</label>
                            <input type="text" className="form-control credit-inputs" placeholder="Name"
                                onChange={(e)=>setOwnCard(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="credit-card-label">Số thẻ</label>
                            <input type="number" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" onChange={(e)=>setNumberCard(e.target.value)}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6"><label className="credit-card-label">Hạn</label><input type="date" className="form-control credit-inputs" placeholder="12/24" onChange={(e)=>setDateCard(e.target.value)}/></div>
                            <div className="col-md-6 mb-5"><label className="credit-card-label">CVV</label><input type="number" className="form-control credit-inputs" placeholder="342" onChange={(e)=>setCvv(e.target.value)}/></div>
                        </div>
                        <Button size="block" onClick={() => payment()}>
                            Thanh toán qua thẻ
                        </Button>
                        <Button size="block" backgroundColor="orange">
                            Thanh toán khi nhận hàng
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
