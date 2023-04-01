import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLogin from "./features/AuthLogin";
import DashBoard from "./features/DashBoard";
import PageNotFound from "./features/PageNotFound";
import Welcome from "./features/Welcome";
import RoutesWare from "./middlewares/routeWare";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/" element={<RoutesWare />}>
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
export default App;
