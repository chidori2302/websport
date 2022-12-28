import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <Helmet title="Đăng nhập">
            <Section>
                <SectionTitle>
                    đăng nhập
                </SectionTitle>
                <SectionBody>
                    <div className="Login">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <label className="login-label" htmlFor="email">Email</label>
                                <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                                <label className="login-label" htmlFor="password">Password</label>
                                <input className="login-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                                <button className="login-btn" type="submit">Đăng nhập</button>
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