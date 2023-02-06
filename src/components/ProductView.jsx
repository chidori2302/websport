import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate} from 'react-router-dom'

// import { withRouter } from 'react-router'

import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import apiUrl from "../assets/fake-data/api"
const ProductView = (props) => {
    const navigate = useNavigate();

    const apiAddToCart = apiUrl.getAPI(`add-to-cart`).api
    const token=localStorage.getItem(`accessToken`)
    const dispatch = useDispatch()
    let product = props.product
    let list = props.list
    if (product === undefined) product = {
        name: "",
        price: '',
        image: ['../images/products/product-02 (1).jpg'],
        categoryCode: "",
        color: [],
        code: "",
        size: [],
        description: ""
    }

    const [previewImg, setPreviewImg] = useState(product.image[0])

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [color, setColor] = useState(undefined)

    const [size, setSize] = useState(undefined)

    const [number, setNumber] = useState(1)
    const [productBuy, setProductBuy] = useState({quantity:''})
    
    
    const updateNumber = (type) => {
        if (type === 'plus') {
            setNumber(number + 1)
        } else {
            setNumber(number - 1 < 1 ? 1 : number - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product.image[0])
        setNumber(1)
        setColor(undefined)
        setSize(undefined)
    }, [product])

    
   

    const check = () => {
        
     
        if (color === undefined) {
            alert('Vui lòng chọn màu sắc!')
            return false
        }

        if (size === undefined) {
            alert('Vui lòng chọn kích cỡ!')
            return false
        }
    
        if (number > productBuy.quantity) {
            alert('Kho không đủ hàng!')
            return false
        }
        return true
    }

    const addToCart = () => {
        if (check()) {
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "id": productBuy.id,
            "price": product.price*number,
            "quantity": number
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(apiAddToCart, requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                alert(`Thêm sản phẩm thành công`)
            })
            .catch(error => {
                console.log('error', error)
                alert(`Thêm sản phẩm thất bại`)
            });
        }
    }
    const goToCart = () => {
        if (check()) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "id": product.id,
            "price": product.price*number,
            "quantity": number
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(apiAddToCart, requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                navigate(`/cart`)
            })
            .catch(error => {
                console.log('error', error)
                alert(`Thêm sản phẩm thất bại`)
            });
        }
    }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image01)}>
                        <img src={product.image[0]} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image[1]} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img className="product__images__img" src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.name}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.color.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`} 
                                    onClick={() => {
                                        setColor(item)
                                        setProductBuy(
                                            list.find(e => {
                                                return e.size === size && e.size === size
                                            })
                                        ) 
                                        console.log(productBuy)
                                    }}>
                                    <div className={`circle`} style={{backgroundColor: item}}></div>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`} 
                                    onClick={() => {
                                        setSize(item)
                                        setProductBuy(
                                            list.find(e => {
                                                return e.size === size && e.size === size
                                            })
                                        ) 
                                        console.log(productBuy)
                                    }}
                                >
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateNumber('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {number}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateNumber('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                    <div style={
                        {
                            height: '20px'
                        }
                    }></div>
                    <div className="product__info__item__title">
                        Kho hàng
                    </div>
                    <div className="product__info__item__quantity">
                     
                        <div className="product__info__item__quantity__input">
                            {productBuy!==undefined? productBuy.quantity:''}
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default ProductView
