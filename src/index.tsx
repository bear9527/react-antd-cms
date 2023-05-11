import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.min.css";
import AppComponent from "./App";
import "./assets/icons";
import store from "./store";
import { Provider } from "react-redux";
moment.locale("zh-cn");
const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <AppComponent />
      </ConfigProvider>
    </Provider>
  );
};
const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(<App />);
