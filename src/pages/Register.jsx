import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    function checkPass(repass) {
        (repass==pass)?console.log(`đúng pass`):console.log(`sai pass`);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <Helmet title="Đăng ký">
            <Section>
                <SectionTitle>
                    đăng ký
                </SectionTitle>
                <SectionBody>
                    <div className="auth-form-container">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <label className="login-label"  htmlFor="name">Họ và tên</label>
                            <input className="login-input"  value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nguyễn Văn A" />
                            <label className="login-label"  htmlFor="email">Email</label>
                            <input className="login-input"  value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                            <label className="login-label"  htmlFor="password">Mật khẩu</label>
                            <input className="login-input"  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <label className="login-label"  htmlFor="password">Nhập lại mật khẩu</label>
                            <input className="login-input"  onBlur={(e) => checkPass(e.target.value)} type="password" placeholder="********" id="repassword" name="repassword" />
                            <button className="login-btn" type="submit">Đăng ký</button>
                        </form>
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Register

