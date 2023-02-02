const url = "http://bb5b-59-153-220-241.ngrok.io"
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
        title: "change-password",
        api: `${url}/home/user/password`
    },
    {
        title: "search",
        api: `${url}/home/search?query=`
    },
]

const getAPI = (title) => apis.find(e => e.title === title)

const apiUrl ={
    getAPI,
}
export default apiUrl

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
