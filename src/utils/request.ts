import { Modal, notification } from "antd";
import axios from "axios";
import store from "../store";
import {getToken} from "../utils/auth";
import { useNavigate } from "react-router-dom";
// 创建一个实例
const service = axios.create({
  // baseURL: "http://node.htmldiv.cn/",
  // baseURL: "http://114.116.125.24:3344/",
  baseURL: "http://localhost:9000/",
  timeout: 10000,
});

service.interceptors.request.use(
  (config: any) => {
    console.log("store", store.getState().userStore.token);
    const _token = store.getState().userStore.token || getToken()
    if(_token){
      config.headers.Authorization = _token
    }
    return config;
  },
  (err) => {
    console.log(err);
    Promise.reject(err);
  }
);
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const openNotificationWithIcon = (type: NotificationType, message: string) => {
  notification[type]({
    message
  });
};

service.interceptors.response.use(
  (response) => {
    const { data } = response
    if(data.status > 0){
      openNotificationWithIcon('error', data.message)
    }
    return response.data;
  },
  (error) => {
    const { status } = error.response;
    if (status === 403) {
      Modal.confirm({
        title: "确定登出?",
        content:
          "由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录",
        okText: "重新登录",
        cancelText: "取消",
        onOk() {
          // let token = store.getState().user.token;
          // store.dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
    if (status === 401) {
      window.open("/login", "_self")
    }
    return Promise.reject(error)
  }
);

export default service