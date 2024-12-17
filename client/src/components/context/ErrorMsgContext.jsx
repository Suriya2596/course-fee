import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useUserSigngOut } from "./UserSigngOut";

const ErrorMsgContext = createContext();

export const ErrorMsgContextProvider = ({ children }) => {
  const { handleSignOut } = useUserSigngOut();

  const handleErrorMsg = ({
    actionResponse,
    msg,
    actionResolve = null,
    isNeedAction401 = true,
  }) => {
    const errorMEssage = JSON.stringify(
      actionResponse?.data?.message || msg || "Please try again"
    );
    toast.error(errorMEssage);

    if (actionResolve) {
      actionResolve();
    }

    if (isNeedAction401 && actionResponse?.status === 401) {
      handleSignOut();
    }
  };

  return (
    <ErrorMsgContext.Provider value={{ handleErrorMsg }}>
      {children}
    </ErrorMsgContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useErrorMsgContext = () => {
  return useContext(ErrorMsgContext);
};

ErrorMsgContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
