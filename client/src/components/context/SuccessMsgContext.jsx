import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const SuccessMsgContext = createContext();

export const SuccessMsgContextProvider = ({ children }) => {
  const handleSuccessMsg = ({
    actionMsg,
    msg = "Successfully completed",
    actionResolve = null,
  }) => {
    toast.success(actionMsg || msg, {
      position: "top-right",
    });
    if (actionResolve) {
      actionResolve();
    }
  };
  return (
    <SuccessMsgContext.Provider value={{ handleSuccessMsg }}>
      {children}
    </SuccessMsgContext.Provider>
  );
};

export const useSuccessMsgContext = () => {
  const context = useContext(SuccessMsgContext);
  return context;
};

SuccessMsgContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
