import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useErrorMsgContext } from "../components/context/ErrorMsgContext";
import { useSuccessMsgContext } from "../components/context/SuccessMsgContext";
import {
  validateEmail,
  validatePassword,
} from "../components/helpers/Validations";
import { userAuthLoginAction } from "../redux/feature/userAuth/userAuthActions";
import { resetUserAuth } from "../redux/feature/userAuth/userAuthSlice";
import {
  InputPasswordLable,
  InputTextLable,
} from "../components/common/InputFields";
import { ButtonBox, ButtonLoading } from "../components/common/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  let formErr = {};

  const { userAuthLoginAct } = useSelector((state) => {
    return state.userAuth;
  });

  const handleFormError = () => {
    if (String(email).trim().length === 0) {
      formErr.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErr.email = "Email is invalidate";
    }

    if (String(password).trim().length === 0) {
      formErr.password = "Password is required";
    } else if (!validatePassword(password)) {
      formErr.password =
        "Password use 8 charater, atleast one uppercase, atleast one number, atleast one symbol";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();
    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
      formErr = {};
    } else {
      localStorage.clear();
      const formData = {
        email,
        password,
      };
      dispatch(userAuthLoginAction({ formData }));
    }
  };

  useEffect(() => {
    if (userAuthLoginAct?.isError) {
      handleErrorMsg({
        actionResponse: userAuthLoginAct?.errorResponse,
        msg: "Error in login",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
        isNeedAction401: false,
      });
    }
  }, [userAuthLoginAct, handleErrorMsg, dispatch]);

  useEffect(() => {
    if (userAuthLoginAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: userAuthLoginAct?.successMsg,
        msg: "Successfully login",
        actionResolve: () => {
          dispatch(resetUserAuth());
          navigate("/");
        },
      });
    }
  }, [userAuthLoginAct, dispatch, handleSuccessMsg, navigate]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Login</h4>
          </div>
          <div className="col-span-12">
            <InputTextLable
              value={email}
              placeholder={"Enter Email"}
              onChange={(e) => {
                setEmail(e.target.value);
                delete formError?.email;
              }}
              label={"Email"}
              error={formError?.email}
            />
          </div>
          <div className="col-span-12">
            <InputPasswordLable
              value={password}
              placeholder={"Enter Password"}
              onChange={(e) => {
                setPassword(e.target.value);
                delete formError?.password;
              }}
              label={"Password"}
              error={formError?.password}
            />
          </div>
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={userAuthLoginAct?.isLoading ? "" : "submit"}>
              {userAuthLoginAct?.isLoading ? <ButtonLoading /> : "Login"}
            </ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <span>Don&lsquo;t have account?</span>{" "}
            <Link to={"/signup"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
