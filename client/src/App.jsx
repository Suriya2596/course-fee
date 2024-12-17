import { Toaster } from "react-hot-toast";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/helpers/ScrollTop";
import AllContextProvider from "./components/context/AllContextProvider";
import Loadable from "./components/helpers/Loadable";
import PrivateRouter from "./components/layouts/PrivateRouter";

const Login = Loadable(lazy(() => import("./pages/Login")));
const Signup = Loadable(lazy(() => import("./pages/Signup")));
const UserDashboard = Loadable(lazy(() => import("./pages/UserDashboard")));
const EditUser = Loadable(lazy(() => import("./pages/EditUser")));

const App = () => {
  return (
    <div>
      <AllContextProvider>
        <ScrollToTop>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="" element={<PrivateRouter />}>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/edit" element={<EditUser />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </AllContextProvider>
    </div>
  );
};

export default App;
