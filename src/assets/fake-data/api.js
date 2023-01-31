const url = "http://271b-183-91-2-166.ngrok.io"
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
    {
        title: "get-all-products",
        api: `${url}/home/all`
    },
    // Nhận dữ liệu sp
]

const getAPI = (title) => apis.find(e => e.title === title)

const apiUrl ={
    getAPI,
}
export default apiUrl

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
