import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import apiUrl from "../assets/fake-data/api";

const Register = (props) => {

    const navigate = useNavigate();
    const api = apiUrl.getAPI(`check-register`).api
    const apiGetOTP = apiUrl.getAPI(`get-otp`).api

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    function checkPass(repass) {
        (repass==pass)?console.log(`đúng pass`):alert(`Sai mật khẩu`);
    }
    const handleSubmit = () => {
        // e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": email,
        "password": pass,
        "phone": phone,
        "name": name,
        "address": address,
        "username": username
        });
        console.log(raw);
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(api, requestOptions)
        
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json()
            }
            throw Error(response.status)
        })
        .then(result => {
            console.log(result)
            // alert(`thanh cong`)
            // let apiGetOtpByEmail = apiGetOTP + email;
            let apiGetOtpByEmail = apiGetOTP + "chidung200150@gmail.com";
            console.log(apiGetOtpByEmail);
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch(apiGetOtpByEmail, requestOptions)
                .then(response => response.json())
                .then(result => {
                    localStorage.setItem('accountRegister', raw);
                    navigate(`/checkotp/${email}`)
                    console.log(result)
                })
                .catch(error => console.log('error', error));

        })
        .catch(error => {
            console.log('error', error)
            // alert(`that bai`)
            // navigate(`/checkotp`)
        });

    }

    return (
        <Helmet title="Đăng ký">
            <Section>
                <SectionTitle>
                    đăng ký
                </SectionTitle>
                <SectionBody>
                    <div className="auth-form-container">
                        <form className="register-form row" 
                        // onSubmit={handleSubmit}
                        >
                            {/* <div className="col-lg-6 col-md-6"> */}

                                <label className="login-label"  htmlFor="name">Họ và tên</label>
                                <input className="login-input"  value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nguyễn Văn A" />
                                <label className="login-label"  htmlFor="name">Số điện thoại</label>
                                <input className="login-input"  value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} id="phone" placeholder="0962xxxxxx" />
                                <label className="login-label"  htmlFor="name">Địa chỉ</label>
                                <input className="login-input"  value={address} name="address" onChange={(e) => setAddress(e.target.value)} id="address" placeholder="Nơi nhận giao hàng" />
                                <label className="login-label"  htmlFor="email">Email</label>
                                <input className="login-input"  value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                                <label className="login-label"  htmlFor="name">Tên đăng nhập</label>
                                <input className="login-input"  value={username} name="username" onChange={(e) => setUserName(e.target.value)} id="username" placeholder="chidori1234" />
                                <label className="login-label"  htmlFor="password">Mật khẩu</label>
                                <input className="login-input"  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                                <label className="login-label"  htmlFor="password">Nhập lại mật khẩu</label>
                                <input className="login-input"  onBlur={(e) => checkPass(e.target.value)} type="password" placeholder="********" id="repassword" name="repassword" />
                                <button className="login-btn" type="button" onClick={handleSubmit}>Đăng ký</button>
                            {/* </div>
                            <div className="col-lg-6 col-md-6">
                            </div> */}
                        </form>
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Register

