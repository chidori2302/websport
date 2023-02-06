import React, { useCallback, useState, useEffect, useRef }  from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import productData from '../assets/fake-data/products'
import apiUrl from "../assets/fake-data/api"
import axios from 'axios';

import banner from '../assets/images/banner.png'

export default function Home () {
    const apiPopular = apiUrl.getAPI(`get-popular-products`).api
    const apiBestseller = apiUrl.getAPI(`get-bestseller`).api
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
    const [products, setProducts] = useState(productData.getAllProducts)
    const [products2, setProducts2] = useState(productData.getAllProducts)
    const getProduct = async () => {
        try {
          const res = await axios.get(apiPopular);
          const result  = filterData(res.data.data)
          console.log(res);
          setProducts(result)
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
        getProduct();
        getProduct2();
      }, []);
    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={false}
                timeOut={5000}
            />
            {/* end hero slider */}

            {/* policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => <Link key={index} to="/policy">
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>)
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end policy section */}

            {/* best selling section */}
            <Section>
                <SectionTitle>
                    top sản phẩm bán chạy trong tuần
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
            {/* end best selling section */}

            {/* new arrival section */}
            <Section>
                <SectionTitle>
                    sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            products.map((item, index) => (
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
            {/* end new arrival section */}
            
            {/* banner */}
            <Section>
                <SectionBody>
                    <a target="_blank" href="https://www.facebook.com/permalink.php?story_fbid=693509195663729&id=100088773905315&substory_index=693509195663729" rel="noreferrer">
                        <img src={banner} alt="" />
                    </a>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* popular product section */}
            <Section>
                <SectionTitle>
                    phổ biến
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            products.map((item, index) => (
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
            {/* end popular product section */}
        </Helmet>
    )
}

