import React, { useState, useEffect } from "react";
import { Link,  useNavigate} from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import apiUrl from "../assets/fake-data/api";
import axios from 'axios';
import productData from '../assets/fake-data/products'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import CartItem2 from '../components/CartItem2'

const Bill = () => {
    const api = apiUrl.getAPI(`bill`).api
    const apiBestseller = apiUrl.getAPI(`get-bestseller`).api
    const token=localStorage.getItem(`accessToken`)
    const [info, setInfo] = useState([

        {
            bill:{
                id:0,
                totalPrice:600000,
                time:"2023-01-05T08:22:24.787+00:00",
                confirm:false,
                status:true,
                userInfo:{
                    username:"u2",
                    address:"HN",
                    phone:"012346",
                    fullname:"User 2"
                }
            },
            billItems:[
                {
                    id:3,
                    quantity:1,
                    price:600000,
                    item:{
                        id:8,
                        name:"Quả bóng đá UEFA Champions League 2020",
                        code:"qua-bong-da-uefa-champions-league-2020",
                        description:null,
                        categoryCode:"dung-cu_bong-da",
                        image:[`../images/products/product-02 (1).jpg`
                        
                    ],
                    size:5,
                    color:"pink",
                    type:null,
                    quantity:19,
                    price:600000,
                    createdDate:"2023-01-04T17:00:00.000+00:00"
                }
            }
        ]
         },
         
        ]
         )
    // const [products, setProducts] = useState(bill.billItems)
    const [products2, setProducts2] = useState(productData.getAllProducts)
    // const [quantity, setQuantity] = useState(info.billItems.quantity)

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

    const getInfo = async () => {
        try {
          const res = await axios.get(
            api,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        //   console.log(res.data.data)
        //   const result = Array.from(res.data)
          setInfo(res.data.data)
        } catch (error) {
          console.log(error);
        }
      };
    const getProduct2 = async () => {
        try {
          const res2 = await axios.get(apiBestseller);
          const result2  = filterData(res2.data.data)
          console.log(res2);
          setProducts2(result2)
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getInfo();
        getProduct2();
      }, []);

    console.log('Giá trị là')
    console.log(info)
    return (
        <Helmet title="Đơn hàng">
            <Section>
            {
            info.map((bill, index) => (
                <SectionBody>
                    <div className="bill shadow-sm container">

                        <div className="bill__info">
                            <div className="bill__info__txt">
                                <div className="bill__info__txt__price">

                                    <span><i class="mr-2 fa fa-qrcode"></i> ID đơn hàng</span>
                                </div>
                                <p className="ml-5">
                                    {bill.bill.id}
                                </p>
                            </div>
                            <div className="bill__info__txt">
                                <div className="bill__info__txt__price">

                                    <span><i class="mr-2 fa-sharp fa-solid fa-satellite-dish"></i> Trạng thái đơn hàng</span>
                                </div>
                                <p className="ml-5">
                                    {bill.bill.confirm?`Đã được duyệt`: `Chưa được duyệt`}
                                </p>
                            </div>
                            <div className="bill__info__txt">
                                <div className="bill__info__txt__price">

                                    <span><i class="mr-2 fa-sharp fa-solid fa-satellite-dish"></i> Thời gian ghi nhận</span>
                                </div>
                                <p className="ml-5">
                                    {Date(bill.bill.time).toLocaleString("en-US")}
                                </p>
                            </div>
                            <div className="bill__info__txt">
                                <div className="bill__info__txt__price">

                                    <span><i class="mr-2 fa fa-location-dot"></i> Địa chỉ nhận hàng</span>
                                </div>
                                <p className="ml-5">
                                    {bill.bill.userInfo.fullname + `, ` +bill.bill.userInfo.phone}
                                </p>
                                <p className="ml-5">
                                    {bill.bill.userInfo.address}
                                </p>
                            </div>
                            <div className="bill__info__txt">
                                <div className="bill__info__txt__price">

                                    <span><i class="mr-2 fa fa-truck-fast mb-4"></i> Thông tin sản phẩm</span>
                                </div>
                             {
                                bill.billItems.map((item, index) => (
                                    <CartItem2 
                                        item={item} 
                                        key={index}
                                    />
                                    ))
                                }
                               
                            </div>
                            
                        </div>
                    </div>
                </SectionBody>
            ))
            }
                
            </Section>
            <Section>
                <SectionTitle>
                    Có thể bạn sẽ thích
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            products2.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    image = {item.image}
                                    name={item.name}
                                    price={Number(item.price)}
                                    slug={item.code}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Bill