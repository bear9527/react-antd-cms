import { FC, useEffect, useState } from "react";
import "./index.scss";
import { getUserInfo } from "../api/user";
const Header: FC = () => {
  const [userInfo, setUserInfo] = useState({ username: "xxx" });
  const reqUser = async () => {
    const resUser = await getUserInfo();
    console.log("resUser", resUser);
    setUserInfo(resUser as any);
  };
  useEffect(()=>{
    reqUser();
  },[])
  return <div className="my-header">{userInfo.username}</div>;
};
export default Header;
