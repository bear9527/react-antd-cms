import { FC } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
interface IRoute {
  activeRoute: any;
}
const CustomBreadcrumb: FC<IRoute> = ({ activeRoute }) => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {activeRoute?.mate?.breadcrumb.map((item: any) => {
          return (
            <Breadcrumb.Item key={item.name}>
              <Link to={item.path} key={item.name}>
                {item.name}
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
};
export default CustomBreadcrumb;
