const url = "http://c3fd-59-153-220-241.ngrok.io"
const apis = [
    {
        title: "login",
        api: `${url}/login`
    },
    // Đăng ký
    {
        title: "register",
        api: `${url}/home/user`
    },
    {
        title: "check-register",
        api: `${url}/home/user/validate`
    },
    {
        title: "get-otp",
        api: `${url}/otp/generate-otp?email=`
    },
    {
        title: "validate-otp",
        api: `${url}/otp/validate`
    },
    // Nhận dữ liệu sp
    {
        title: "get-all-products",
        api: `${url}/home/all`
    },
    {
        title: "get-general-products",
        api: `${url}/home/general/`
    },
    {
        title: "get-popular-products",
        api: `${url}/home/popular`
    },
    {
        title: "get-bestseller",
        api: `${url}/home/bestseller`
    },




    {
        title: "change-password",
        api: `${url}/home/user/password`
    },
    {
        title: "search",
        api: `${url}/home/search?query=`
    },
    {
        title: "search",
        api: `${url}/home/search?query=`
    },
    {
        title: "add-to-cart",
        api: `${url}/cart`
    },
    {
        title: "get-cart",
        api: `${url}/cart`
    },
    {
        title: "del-cart",
        api: `${url}/cart/`
    },
    {
        title: "update-cart",
        api: `${url}/cart/update/`
    },
    {
        title: "payment",
        api: `${url}/cart/payment`
    },
    {
        title: "bill",
        api: `${url}/cart/bill`
    },
]

const getAPI = (title) => apis.find(e => e.title === title)

const apiUrl ={
    getAPI,
}
export default apiUrl

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
