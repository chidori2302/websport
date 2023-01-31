import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { updateItem, removeItem } from '../redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../utils/numberWithCommas'
import { Link } from 'react-router-dom'

const CartItem = props => {

    const dispatch = useDispatch()

    const itemRef = useRef(null)

    const [item, setItem] = useState(props.item)
    const [number, setNumber] = useState(props.item.number)

    useEffect(() => {
        setItem(props.item)
        setNumber(props.item.number)
    }, [props.item])

    const updateNumber = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({...item, number: number + 1}))
        }
        if (opt === '-') {
            dispatch(updateItem({...item, number: number - 1 === 0 ? 1 : number - 1}))
        }
    }

    const removeCartItem = () => {
        console.log('removeCartItem')
        dispatch(removeItem(item))
    }

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.product.image02} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        {`${item.product.title} - ${item.color} - ${item.size}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(item.price)}
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateNumber('-')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {number}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateNumber('+')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__del">
                    <i className='bx bx-trash' onClick={() => removeCartItem()}></i>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem
