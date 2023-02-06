import React, {  useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

import productData from '../assets/fake-data/products'
import apiUrl from "../assets/fake-data/api"
import axios from 'axios';

const Product = () => {
    let { keyword } = useParams();
    const api = apiUrl.getAPI(`search`).api + keyword
    let productList = productData.getAllProducts()

    const [product, setProducts] = useState(productList)
    const [proto, setProto] = useState([])

    const filterData = (props)=>{
        props.forEach((currentValue, index, arr)=>{
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
        return props.filter(e => e.code !== null)
    }
    const getProduct = async () => {
        try {
          const res = await axios.get(api)
          const result = JSON.parse(JSON.stringify(res.data))
          console.log(result)
          setProto(result)
        //   productList = 
          setProducts(filterData(res.data))
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getProduct();
      }, []);

    
    return (
        <Helmet title={product.name}>
            <Section>
                <SectionBody>
                    <ProductView 
                        product={product[0]}
                        list = {proto}
                    />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {/* {
                            relatedProducts.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    image = {item.image}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                    quantity={item.quantity}
                                />   
                            ))
                        } */}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
