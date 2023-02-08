import React, { useState, useRef, useEffect } from 'react'
import { Link,  useNavigate} from 'react-router-dom'
import axios from 'axios';

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import numberWithCommas from '../utils/numberWithCommas'
import apiUrl from "../assets/fake-data/api"

const CartItem2 = props => {
    const dispatch = useDispatch()

    const itemRef = useRef(null)

    const [item, setItem] = useState(props.item)
    let [number, setNumber] = useState(props.item.quantity)


    return (
        <div className="bill__item" ref={itemRef}>
            <div className="bill__item__image">
                <img src={item.item.image[0]} alt="" />
                {/* <img src={'https://www.insidesport.in/wp-content/uploads/2021/06/harry-maguire.jpg'} alt="" /> */}
            </div>
            <div className="bill__item__info d-block">
                <div className="bill__item__info__name">
                    <Link to={`/product/${item.item.name}`}>
                        {`${item.item.name}`}
                    </Link>
                </div>
                <div className="bill__item__info__name text-secondary">
                        {`Màu: ${item.item.color}, cỡ: ${item.item.size}`}
                </div>
                <div className="bill__item__info__price">
                    {numberWithCommas(item.item.price*number)}
                </div>
            </div>
        </div>
    )
   
}

CartItem2.propTypes = {
    item: PropTypes.object
}

export default CartItem2
