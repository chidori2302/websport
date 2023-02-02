import React, { useState } from "react";
import { Link , useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import apiUrl from "../assets/fake-data/api";

const ChangeInfo = (props) => {

    const navigate = useNavigate();
    const api = apiUrl.getAPI(`change-password`).api
    const accessToken=localStorage.getItem(`accessToken`)
    const [email, setEmail] = useState('chidung');
    const [pass, setPass] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [name, setName] = useState('');
    function checkPass(repass) {
        (repass==pass)?console.log(`đúng pass`):alert(`Sai mật khẩu`);
    }
    const handleSubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "newPassword": pass,
        "oldPassword": oldPass
        });

        var requestOptions = {
        method: 'PUT',
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
            navigate(`/login`)
        })
        .catch(error => {
            console.log('error', error)
            alert(`that bai`)
        });
    }

    return (
        <Helmet title="Đăng ký">
            <Section>
                <SectionTitle>
                    đổi mật khẩu
                </SectionTitle>
                <SectionBody>
                    <div className="auth-form-container">
                        <form className="register-form">
                            <label className="login-label"  htmlFor="password">Mật khẩu cũ</label>
                            <input className="login-input"  value={oldPass} onChange={(e) => setOldPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <label className="login-label"  htmlFor="password">Mật khẩu mới</label>
                            <input className="login-input"  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <label className="login-label"  htmlFor="password">Nhập lại mật khẩu mới</label>
                            <input className="login-input"  onBlur={(e) => checkPass(e.target.value)} type="password" placeholder="********" id="repassword" name="repassword" />
                            <button className="login-btn" type="button" onClick={handleSubmit}>Cập nhật</button>
                        </form>
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default ChangeInfo

