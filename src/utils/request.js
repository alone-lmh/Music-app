import axios from "axios";

const instance=axios.create({
  timeout:5000,//设置超时时间
  baseURL:"http://121.41.30.226:3000"//设置web服务器的跟地址
})

//config是配置信息
export function get(url, config) {
  return instance.get(url, config);
}

export function post(url, data, config) {
  return instance.post(url, data, config);
}
