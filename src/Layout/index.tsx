import Icon from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { MenuDate } from "./MenuDate";
import { Outlet, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import SvgIcon from "../components/SvgIcon";
import logo from "../assets/icons/img/logo.png"
import MyHeader from "./Header";
import CustomBreadcrumb from "./CustomBreadcrumb";
import routeData from "../router/routeData";
import { deepQuery } from "../utils/tool";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  ...MenuDate.map((item: any) => {
    return getItem(item.title, item.key, item.icon ? <SvgIcon iconName={item.icon}/> : null, 
    item?.children && item?.children.map((itemChildren: any) => {
        return getItem(itemChildren.title, itemChildren.key, item.icon ? <SvgIcon iconName={item.icon} /> : null);
      }),
    );
  }),
];

type ContextType = { activeRoute: any | null };

const App: React.FC = () => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState(deepQuery(routeData, pathname, "path"));
  const navgate = useNavigate();
  const menuSelect = (a: any) => {
    navgate(a.key);

    setActiveRoute(deepQuery(routeData, a.key, "key"))
  };


    

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={menuSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 16 }} >
          <MyHeader />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <CustomBreadcrumb activeRoute={activeRoute} />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet context={{activeRoute}}/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export function useActiveRoute() {
  return useOutletContext<ContextType>();
}
export default App;
