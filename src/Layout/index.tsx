// import Icon from "@ant-design/icons";
import store from "../store";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { MenuData } from "./MenuData";
import {
  Outlet,
  useNavigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import SvgIcon from "../components/SvgIcon";
import logo from "../assets/icons/img/logo.png";
import MyHeader from "./Header";
import CustomBreadcrumb from "./CustomBreadcrumb";
import routeData from "../router/routeData";
import { deepQuery } from "../utils/tool";
import { useDispatch, useSelector } from "react-redux";
import { getTopCateList } from "@/store/modules/categoryStore";
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
console.log("MenuData", MenuData);

// items = itemsFn()

// store.subscribe(() => {
//   console.log('MenuData()',MenuData());

// items = itemsFn()
// });

type ContextType = { activeRoute: any | null };

const App: React.FC = () => {
  const dispatch = useDispatch();

  // 从store中获取list数据
  const { categoryList } = useSelector((state: any) => state.categoryStore);

  useEffect(() => {
    dispatch(getTopCateList() as any);
  }, [dispatch]);

  const menuFn = (MenuList: MenuItem[]) => [
    ...MenuList.map((item: any) => {
      return getItem(
        item.title,
        item.key,
        item.icon ? <SvgIcon iconName={item.icon} /> : null,
        item?.children &&
          item?.children.map((itemChildren: any) => {
            return getItem(
              itemChildren.title,
              itemChildren.key,
              itemChildren.icon ? (
                <SvgIcon iconName={itemChildren.icon} />
              ) : null
            );
          })
      );
    }),
  ];
  let items: MenuItem[] = [...menuFn(MenuData)];
  const [menuItems, setMenuItems] = useState(items);
  useEffect(() => {
    MenuData.forEach((item) => {
      console.log("item", item.path === "/category");

      item.path === "/category" &&
        (item.children = categoryList.map((item: any) => {
          return {
            key: "category/" + item.id,
            // key: 'category',
            title: item.title,
            // icon: item.img,
            icon: "site",
            path: "/category",
            permission: "user-management",
          };
        }));
    });
    items = menuFn(MenuData);
    setMenuItems([...menuFn(MenuData)]);
    console.log("appppppp MenuData", items);
  }, [dispatch, categoryList]);

  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState(
    deepQuery(routeData, pathname, "path")
  );
  const navgate = useNavigate();

  const menuSelect = (a: any) => {
    navgate(a.key);

    setActiveRoute(deepQuery(routeData, a.key, "key"));
  };

  useEffect(() => {
    console.log("pathname", pathname);
  }, []);

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
          defaultSelectedKeys={[pathname.substring(1)]}
          mode="inline"
          items={menuItems}
          onSelect={menuSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 16 }}>
          <MyHeader />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {/* <CustomBreadcrumb activeRoute={activeRoute} /> */}
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            <Outlet context={{ activeRoute }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by bear9527 UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export function useActiveRoute() {
  return useOutletContext<ContextType>();
}
export default App;
