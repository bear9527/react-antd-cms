import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, addItem } from "../../store/modules/counterStore";
import { useActiveRoute } from "../../Layout";
const Home = () => {
  const { activeRoute } = useActiveRoute()
  
  console.log("useActiveRoute", activeRoute);
  const [params] = useSearchParams();
  const id = params.get("id");
  const { count, list } = useSelector((state: any) => state.counterStore);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(add());
  };

  // const getData = async () => {
  //   const res = await getUserInfo();
  //   console.log("res", res.status);
  //   dispatch(addItem(res.status));
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  const navigate = useNavigate()
  const gotoDash = ()=>{
    navigate("/dashboard",{state:{title:'666'}})
  }
  return (
    <div>
      home id:{id}
      <Link to={"/about/890"}>about</Link>
      <button onClick={gotoDash}>home</button>
      <br />
      {list}
      <h1>count:{count}</h1>
      <h3>
        <button onClick={clickHandler}>add</button>
      </h3>
    </div>
  );
};
export default Home;
