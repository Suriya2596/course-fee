// import React from "react";
import PropTypes from "prop-types";
import { UserSigngOutProvider } from "./UserSigngOut";
import { SuccessMsgContextProvider } from "./SuccessMsgContext";
import { ErrorMsgContextProvider } from "./ErrorMsgContext";
const AllContextProvider = ({ children }) => {
  return (
    <UserSigngOutProvider>
      <SuccessMsgContextProvider>
        <ErrorMsgContextProvider>{children}</ErrorMsgContextProvider>
      </SuccessMsgContextProvider>
    </UserSigngOutProvider>
  );
};
AllContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AllContextProvider;
