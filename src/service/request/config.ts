// 基础配置
const BASE_URL=import.meta.env.VITE_BASE_URL
const TIME_OUT=1000

export {BASE_URL,TIME_OUT}






// 配置环境变量的方法2
// let BASE_URL = ''
// const TIME_OUT = 10000
 
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'XXXXXXXXX'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'XXXXXXXXX'
// }
  
// export { BASE_URL,TIME_OUT}