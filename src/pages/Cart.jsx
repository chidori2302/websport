import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CheckBox from '../components/CheckBox'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'
import apiUrl from "../assets/fake-data/api"

const Cart = () => {
    // console.log('re load')
    const navigate = useNavigate();
    const api = apiUrl.getAPI(`get-cart`).api
    const apiPayment = apiUrl.getAPI(`payment`).api
    const token=localStorage.getItem(`accessToken`)
    let listCart =[
        // {
        //     id: 1,
        //     itemDto: {
        //         id: 5,
        //         name: "",
        //         code: "ao-doi-tuyen-anh-san-khach-2022",
        //         description: null,
        //         categoryCode: "trang-phuc_bong-da",
        //         image: ['3','2'],
        //         size: "M",
        //         color: "",
        //         type: null,
        //         quantity: 0,
        //         price: 57,
        //     },
        //     username: ``,
        //     quantity: '',
        //     price: ''
        // },
    ]

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle visibility
    setIsShown(current => !current);
  };
    // const [buy, setBuy] = useState([])
    const [typeCard, setTypeCard] = useState(undefined)

    const [numberCard, setNumberCard] = useState(undefined)

    const [ownCard, setOwnCard] = useState(undefined)

    const [dateCard, setDateCard] = useState(undefined)

    const [cvv, setCvv] = useState(undefined)


    const [address, setAddress] = useState(undefined)

    const [name, setName] = useState(undefined)

    const [email, setEmail] = useState(undefined)

    const [phone, setPhone] = useState(undefined)

    // const cartItems = useSelector((state) => state.cartItems.value)

    const [cartProducts, setCartProducts] = useState(listCart)
    const [totalPrice, setTotalPrice] = useState(0)
    

    const initFilter = []
    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (checked, item) => {
        if (!filter.includes(item)) {
            setFilter([...filter, item])
            
        } else {
            const newCategory = filter.filter(e => e !== item)
            setFilter(newCategory)
            
            
        }
    }
    console.log(filter)
    const getCart = async () => {
        
        
        try {
          const res = await axios.get(
            api,
            { headers: {"Authorization" : `Bearer ${token}`} }
          );
        //   console.log(res.data);
          setCartProducts(res.data)
        } catch (error) {
          console.log(error);
        }
    };
    const callbackFunction = (childData) => {
        
        switch (childData[0]) {
            case '+':
                let add = totalPrice+childData[1]
                // totalPrice = totalPrice+childData[1]
                console.log(add)
                setTotalPrice(add)
                break;
            case '-':
                let sub = totalPrice-childData[1]
                console.log(sub)
            
                setTotalPrice(sub)
                break;
        
            default:
                break;
        }
    }
    
    useEffect(() => {
        getCart()
        
    }, [])

    const check = () => {
        // if (typeCard === undefined) {
        //     alert('Vui lòng chọn loại thẻ!')
        //     return false
        // }
        
        if (name === undefined) {
            alert('Vui lòng nhập tên của bạn!')
            return false
        }
        if (address === undefined) {
            alert('Vui lòng nhập địa chỉ nhận hàng!')
            return false
        }
        // if (email === undefined) {
        //     alert('Vui lòng nhập email!')
        //     return false
        // }
        if (phone === undefined) {
            alert('Vui lòng nhập số điện thoại!')
            return false
        }
        return true
    }

    const payment = ()=>{
        if (check()) {
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "address": "HN",
            "cartList": 
                filter.map(e=>{return {
                    "id": e.id,
                    "username": e.username,
                    "itemId": e.itemDto.id,
                    "quantity": e.quantity,
                    "price": e.price
                }})
            
            });
            console.log(raw)
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(apiPayment, requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                navigate(`/bill`)
            })
            .catch(error => {
                console.log('error', error)
                alert(`Thất bại`)
            });
        }
    }
    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {cartProducts.length} sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Tổng tiền:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
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
                <div className="cart__list ">
                    {
                        cartProducts.map((item, index) => (
                            <React.Fragment>
                                <div className="d-flex flex-nowrap">

                                            <CheckBox
                                                onChange={(input) => filterSelect(input.checked, item)}
                                                checked={filter.includes(item)}
                                            />
                                            <CartItem 
                                                item={item} 
                                                key={index}
                                                parentCallback={callbackFunction}
                                            />
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>

            <div id="checkoutModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="payment-info p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4><b>Thông tin mua hàng</b></h4>
                        </div>
                        <div className="mb-3">
                            <label className="credit-card-label">Họ và tên</label>
                            <input type="text" className="form-control credit-inputs" placeholder="Nguyễn Văn A"
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="credit-card-label">Địa chỉ nhận hàng</label>
                            <input type="text" className="form-control credit-inputs" placeholder="Cụm 5, Ích Vịnh,..." onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6"><label className="credit-card-label">Email</label><input type="email" className="form-control credit-inputs" placeholder="abc@gmail.com" onChange={(e)=>setEmail(e.target.value)}/></div>
                            <div className="col-md-6 mb-5"><label className="credit-card-label">Số điện thoại</label><input type="number" className="form-control credit-inputs" placeholder="092655..." onChange={(e)=>setPhone(e.target.value)}/></div>
                        </div>

                        <div className="credit-card" style={{display: isShown ? 'block' : 'none'}}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4><b>Thông tin thẻ</b></h4>
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
                        </div>
                        <Button size="block" onClick={() => isShown ? payment() : handleClick() }>
                            Thanh toán qua thẻ
                        </Button>
                        <Button size="block" backgroundColor="orange" onClick={() => payment()}>
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
