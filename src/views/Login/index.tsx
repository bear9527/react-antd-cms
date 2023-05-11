// import { Link, useSearchParams } from "react-router-dom";
import { login, ILoginInfo } from "../../api/login";
import { Button, Form, Input } from "antd";
import { setToken } from "../../utils/auth";
import { setToken as setStoreToken } from "../../store/modules/userStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.scss";
const Login = () => {
  const dispatch = useDispatch();
  const navgate = useNavigate();
  // const [params] = useSearchParams();
  // const id = params.get("id");

  const onFinish = (values: ILoginInfo) => {
    console.log("Success:", values);
    reqLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const reqLogin = async (values: ILoginInfo) => {
    try {
      const resLogin = await login(values);
      if (!resLogin.status) {
        console.log("login", resLogin);
        setToken(resLogin.data);
        dispatch(setStoreToken(resLogin.data));

        navgate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-wrap">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
