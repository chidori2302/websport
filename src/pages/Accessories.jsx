import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'
import price from '../assets/fake-data/product-price'
import axios from 'axios';
import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import size from '../assets/fake-data/product-size'
import apiUrl from "../assets/fake-data/api"

const Accessories = () => {
    let productList = productData.getAllProducts()
    const api = apiUrl.getAPI(`get-general-products`).api +`dung-cu`
    
    const filterData = (result)=>{
        result.forEach((currentValue, index, arr)=>{
            let code = currentValue.code;
            let objIndex = arr.findIndex((item)=>{
                return item.code == code
            });
            if (index == objIndex) {
                currentValue.color = [currentValue.color]
                currentValue.size = [currentValue.size]
            } else{
                if (!(arr[objIndex].color.includes(currentValue.color))) {
                    arr[objIndex].color = [...arr[objIndex].color,currentValue.color]
                }
                if (!(arr[objIndex].size.includes(currentValue.size))) {
                    arr[objIndex].size = [...arr[objIndex].size,currentValue.size]
                }
                currentValue.code = null
            }
        })
        return result.filter(e => e.code !== null)
    }
    
    const initFilter = {
        category: [],
        color: [],
        size: [],
        price: null
    }

    const getProduct = async () => {
        try {
          const res = await axios.get(api);
          productList = filterData(res.data)
          console.log(productList);
          setProducts(productList)
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getProduct();
      }, []);
    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                case "SIZE":
                    setFilter({...filter, size: [...filter.size, item.size]})
                    break
                case "PRICE":
                    setFilter({...filter, price: item.price})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({...filter, size: newSize})
                    break
                case "PRICE":
                    const newPrice = filter.price.filter(e => e !== item.price)
                    setFilter({...filter, price: newPrice})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    {/* <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                size.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                            checked={filter.size.includes(item.size)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div> */}

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            giá
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                price.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("PRICE", input.checked, item)}
                                            checked={filter.price == item.price}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        data={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Accessories
