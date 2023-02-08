import React, { useState, useRef, useEffect } from 'react'
import { Link,  useNavigate} from 'react-router-dom'
import axios from 'axios';

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateItem, removeItem } from '../redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../utils/numberWithCommas'
import apiUrl from "../assets/fake-data/api"

const CartItem = props => {
    // const navigate = useNavigate();
    let apiDel = apiUrl.getAPI(`del-cart`).api
    let apiUpdate = apiUrl.getAPI(`update-cart`).api
    const token=localStorage.getItem(`accessToken`)
    const dispatch = useDispatch()

    const itemRef = useRef(null)

    const [item, setItem] = useState(props.item)
    let [number, setNumber] = useState(props.item.quantity)
    useEffect(() => {
        setItem(props.item)
        setNumber(props.item.quantity)
    }, [item])

    const sendData = (data) => {
        props.parentCallback(data);
    }

    const updateItem = async (opt, id, price)=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        let Ppri = item.itemDto.price*(opt=='+'?++number:--number)
        var raw = JSON.stringify({
            "id": item.id,
            "quantity": number,
            "price": Ppri
          });
        
        item.quantity=number
        console.log( item.quantity)
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch(apiUpdate, requestOptions)
        .then(response => response.text())
        .then(setNumber(opt=='+'?number++:number--))
        .catch(error => console.log('error', error));
        }
    const updateNumber = (opt) => {
        if (opt === '+') {
            updateItem(opt)
            sendData(['+', item.itemDto.price])
            
        }
        if (opt === '-') {
            updateItem(opt)
            sendData(['-', item.itemDto.price])
        }
    }
    
    const removeCartItem = (props) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = "";

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${apiDel}${props}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            dispatch(removeItem(item))
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.itemDto.image[0]} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/product/${item.itemDto.name}`}>
                        {`${item.itemDto.name} - ${item.itemDto.color} - ${item.itemDto.size}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(item.itemDto.price*number)}
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateNumber('-')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {number}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateNumber('+', item.id, item.quantity)}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__del">
                    <i className='bx bx-trash' onClick={() => removeCartItem(item.id)}></i>
                </div>
            </div>
        </div>
    )
   
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem
