import React, { useState } from "react";
import { Link,  useNavigate} from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import apiUrl from "../assets/fake-data/api";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const api = apiUrl.getAPI(`login`).api
    console.log(typeof api);
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const handleSubmit = () => {
        var myHeaders = new Headers();
        // myHeaders.append("token", "acss");
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "username": email,
            "password": pass
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            mode: 'cors',
            redirect: 'follow'
          };
        
        fetch(api, requestOptions)
        // axios
        // .post(api, formData, {
        //     headers: {
        //     "Content-Type": "multipart/form-data",
        //     },
        // })
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
            localStorage.setItem("accessToken", result.token)
            localStorage.setItem("isAdmin", result.isAdmin)
            navigate(`/`)
        })
        .catch(error => {
            console.log('error', error)
            alert(`that bai`)
        });
        console.log(email,pass);
    }

    return (
        <Helmet title="Đăng nhập">
            <Section>
                <SectionTitle>
                    đăng nhập
                </SectionTitle>
                <SectionBody>
                    <div className="Login">
                            <form className="login-form"  >
                                <label className="login-label" htmlFor="email">Tên đăng nhập</label>
                                <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)}type="text" placeholder="youremail@gmail.com" id="email" name="email" />
                                <label className="login-label" htmlFor="password">Password</label>
                                <input className="login-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                                <button className="login-btn" type="button" onClick={handleSubmit}>Đăng nhập</button>
                                <Link to="/register">
                                    Bạn không có tài khoản? Đăng ký ở đây!
                                </Link>
                            </form>
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Login