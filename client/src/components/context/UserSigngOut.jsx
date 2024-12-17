import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserAuthValue } from "../../redux/feature/userAuth/userAuthSlice";
import Cookies from "js-cookie";
const UserSigngOut = createContext();

const UserSigngOutProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(resetUserAuthValue());
    navigate("/login");
    Cookies.remove("token");
  };
  return (
    <UserSigngOut.Provider value={{ handleSignOut }}>
      {children}
    </UserSigngOut.Provider>
  );
};

const useUserSigngOut = () => {
  return useContext(UserSigngOut);
};

UserSigngOutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// eslint-disable-next-line react-refresh/only-export-components
export { useUserSigngOut, UserSigngOutProvider };
