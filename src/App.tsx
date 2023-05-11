import "./style/index.scss";
// import Layout from "./views/Layout";
import RoutesChildren from "./router/index";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesChildren />
      </BrowserRouter>
    </div>
  );
}

export default App;
