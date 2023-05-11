import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/modules/counterStore";
import { useLocation, useSearchParams } from "react-router-dom";
const Dashboard = () => {
  const { count, list } = useSelector((state: any) => state.counterStore);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(addItem("react"));
  };
  const location = useLocation()
  console.log('location',location);

  // const [searchParams,setSearchParams]= useSearchParams()
  // setSearchParams({name:'999'})
  // console.log('useSearchParams',searchParams.get('name'));
  
  return (
    <div>
      <h2>{count}</h2>
      <h4>{list.join(',')}</h4>
      <button onClick={clickHandler}>push</button>
      Dashboard
    </div>
  );
};
export default Dashboard;
