
import axios from 'axios';
export const baseUrl = 'http://localhost:4000/reliefSupplies';
//创建axios实例,初始化配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers:{
    'Content-Type':'application/json'
  }
});
//设置响应拦截器
axiosInstance.interceptors.response.use(
  res => res.data,
  err => console.log(err + "网络错误")
)
export { axiosInstance }
//下拉选择框类型
export const categoryTypes = [
    {
        key:"居住类",
        value:"居住类"
    },
    {
        key:"床上用品类",
        value:"床上用品类"
    },
    {
        key:"衣着类",
        value:"衣着类"
    },
    {
        key:"救灾设备类",
        value:"救灾设备类"
    },
    {
        key:"基本生活类",
        value:"基本生活类"
    },
]

