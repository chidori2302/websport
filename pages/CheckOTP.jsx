import React, { useCallback, useState, useEffect, useRef } from 'react'
import Helmet from '../components/Helmet'
import apiUrl from "../assets/fake-data/api";

import Button from '../components/Button'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import { Link, useNavigate, useParams   } from 'react-router-dom'

const CheckOTP = ()=>{
    const { email } = useParams();
    const navigate = useNavigate();
    const api = apiUrl.getAPI(`validate-otp`).api
    const apiRegister = apiUrl.getAPI(`register`).api
    const [otp, setOtp] = useState('');
    const accountRegister=localStorage.getItem(`accountRegister`)
    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": "chidung200150@gmail.com",
        "otp": otp
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(api, requestOptions)
        .then(response => response.text())
        .then(result => {
            var requestOptions2 = {
                method: 'POST',
                headers: myHeaders,
                body: accountRegister,
                redirect: 'follow'
                };
            console.log(requestOptions2);  
            fetch(apiRegister, requestOptions2)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
    }

    return (
        <Helmet title="Xác thực tài khoản">
            <Section>
                <SectionTitle>
                    Nhập mã OTP
                </SectionTitle>
                <SectionBody>

                <div class="userInput">
                    <input type="number" id='otp' autoFocus onChange={(e) => setOtp(e.target.value)}/>
                    <Button size="sm" onClick={handleSubmit}>Xác nhận</Button>
                    <Button size="sm" onClick={console.log(`ok`)}
                        backgroundColor="pink"
                    >Gửi lại mã</Button>
                </div>
                </SectionBody>
            </Section>
        </Helmet>
        
    )
}

export default CheckOTP

