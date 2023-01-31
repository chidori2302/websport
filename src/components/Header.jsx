import React, {useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate   } from 'react-router-dom'
import logo from '../assets/images/Logo-2.png'
const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Trang phục",
        path: "/catalog"
    },
    {
        display: "Dụng cụ & Thiết bị",
        path: "/accessories"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const Header = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    const [toggle, setToggle] = useState(false)
    const headerRef = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll")
        };
    }, []);

    const checkLogin=localStorage.getItem(`accessToken`)!==null
    const checkAdmin=localStorage.getItem(`isAdmin`)== `true`
    const handleLogout = ()=>{
        localStorage.removeItem('accessToken');
    }
    const navigate = useNavigate();
    const handleKeyPress = (e)=>{
        if (e.which==13) {
            navigate(`/search/${e.target.value}`)
            console.log(e.target.value);
        }
    }
    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')
    // const {isShowing, toggleSearch} = useModal()
    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item search">
                            <input  type="text"
                                onKeyPress={(e)=>handleKeyPress(e)}
                            />
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            
                           <i 
                                 onClick={() => setToggle(!toggle)}
                                 onBlur={() => setToggle(!toggle)}
                                className="bx bx-user dropdown-toggle" data-toggle="dropdown">
                            </i>
                            {toggle && (
                                <ul className="dropdown-menu ">
                                    <Link to="/login">
                                        <li className={checkLogin?"dropdown-item d-none":"dropdown-item"}>Đăng nhập</li>
                                    </Link>
                                    <Link to="/register">
                                        <li className={checkLogin?"dropdown-item d-none":"dropdown-item"}>Đăng ký</li>
                                    </Link>
                                    <Link to="/changeinfo">
                                        <li className={checkLogin?"dropdown-item":"dropdown-item d-none"}>Đổi mật khẩu</li>
                                    </Link>
                                    <Link to="/login">
                                        <li className="dropdown-item" onClick={handleLogout}>Đăng xuất</li>
                                    </Link>
                                    <Link to="/control">
                                        <li className={checkAdmin?"dropdown-item":"dropdown-item d-none"}>Quản lý cửa hàng</li>
                                    </Link>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
