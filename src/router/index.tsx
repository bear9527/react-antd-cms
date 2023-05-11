//router/index.js文件
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import routeDate from "./routeData";
import { LazyImportComponent } from "./lazyComponent";
//定义的路由函数直接挂载到主页面上去
const Router = function () {
  return (
    <Routes>
      {routeDate.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            element={
              <LazyImportComponent lazyChildren={item.component as any} />
            }
          >
            {item.children &&
              item.children.map((itemChildren, indexC) => {
                return (
                  <Route
                    key={indexC}
                    path={itemChildren.path}
                    element={
                      <LazyImportComponent
                        lazyChildren={itemChildren.component}
                      />
                    }
                  ></Route>
                );
              })}
          </Route>
        );
      })}
    </Routes>
  );
};
export default Router;
