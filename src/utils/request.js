/**
 * 封装 axios 请求模块
 */
import axios from "axios"
import store from '@/store/index.js'

const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/", // 基础路径
	// 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      return JSON.parse(data)
    }
    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
	
	const { user } = store.state;
	
	// 如果用户已登录，统一给接口设置token信息
	if(user) {
		config.headers.Authorization = `Bearer ${user.token}`
	}
	
	// 配置完成要返回config
	return config;
}, function (error) {
	return Promise.reject(error);
})



//响应拦截器


// 导出
export default request


