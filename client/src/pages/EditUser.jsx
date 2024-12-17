import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  feesGetApplicationAction,
  feesGetExamAction,
} from "../redux/feature/fees/feesAction";
import {
  InputNumberLable,
  InputTextLable,
} from "../components/common/InputFields";
import { ButtonBox, ButtonLoading } from "../components/common/Button";
import { useErrorMsgContext } from "../components/context/ErrorMsgContext";
import { useSuccessMsgContext } from "../components/context/SuccessMsgContext";
import {
  userAuthGetAction,
  userAutUpdateAction,
} from "../redux/feature/userAuth/userAuthActions";
import { validateName } from "../components/helpers/Validations";
import { resetUserAuth } from "../redux/feature/userAuth/userAuthSlice";
import { ALL_COURSES, ALL_LEVEL } from "../components/helpers/otherHelpers";

const EditUser = () => {
  const dispatch = useDispatch();
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [feeType, setFeeType] = useState("");
  const [nationality, setNationality] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState(null);

  const [levelOptions, setLevelOptions] = useState(ALL_LEVEL);
  const [courseOptions, setCourseOptions] = useState(ALL_COURSES);

  const [formError, setFormError] = useState({});
  let formErr = {};

  useEffect(() => {
    const resCall = () => {
      dispatch(feesGetExamAction());
      dispatch(feesGetApplicationAction());
      dispatch(userAuthGetAction());
    };
    return () => {
      return resCall();
    };
  }, [dispatch]);

  const { userData, userAuthUpdateAct } = useSelector((state) => {
    return state.userAuth;
  });

  useEffect(() => {
    if (userData) {
      setName(userData?.name || "");
      setMobile(String(userData?.mobile) || "");
    }
  }, [userData]);

  const handleFormError = () => {
    if (String(name).trim().length === 0) {
      formErr.name = "Name is required";
    }
    if (String(mobile).trim().length === 0) {
      formErr.mobile = "Mobile is required";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();
    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
      formErr = {};
    } else {
      const formData = {
        name,
        mobile,
      };
      dispatch(userAutUpdateAction({ id: userData?._id, formData }));
    }
  };

  useEffect(() => {
    if (userAuthUpdateAct?.isError) {
      handleErrorMsg({
        actionResponse: userAuthUpdateAct?.errorResponse,
        msg: "Error in update details",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
      });
    }
  }, [userAuthUpdateAct, dispatch, handleErrorMsg]);

  useEffect(() => {
    if (userAuthUpdateAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: userAuthUpdateAct?.successMsg,
        msg: "Successfully updated details",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
      });
    }
  }, [userAuthUpdateAct, dispatch, handleSuccessMsg]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Edit User</h4>
          </div>
          <div className="col-span-12">
            <InputTextLable
              value={name}
              placeholder={"Enter Name"}
              onChange={(e) => {
                if (validateName(e.target.value)) {
                  setName(e.target.value);
                  delete formError?.name;
                }
              }}
              label={"Name"}
              error={formError?.name}
            />
          </div>
          <div className="col-span-12">
            <InputNumberLable
              value={mobile}
              placeholder={"Enter Mobile"}
              onChange={(e) => {
                setMobile(e.target.value);
                if (String(e.target.value).trim().length !== 10) {
                  setFormError({
                    ...formError,
                    mobile: "Mobile length should be 10",
                  });
                } else {
                  delete formError?.mobile;
                }
              }}
              label={"Mobile"}
              error={formError?.mobile}
            />
          </div>
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={userAuthUpdateAct?.isLoading ? "" : "submit"}>
              {userAuthUpdateAct?.isLoading ? <ButtonLoading /> : "Save Change"}{" "}
            </ButtonBox>
          </div>
          <div className="col-span-12 text-center flex justify-center items-center gap-4 flex-col lg:flex-row">
            <Link to={"/"}>Back to home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
