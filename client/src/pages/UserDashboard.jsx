import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { userAuthGetAction } from "../redux/feature/userAuth/userAuthActions";
import { resetUserAuth } from "../redux/feature/userAuth/userAuthSlice";
import { PageLoading } from "../components/common/LoadingCustom";
import { ButtonBox, ButtonCancle } from "../components/common/Button";
import { useErrorMsgContext } from "../components/context/ErrorMsgContext";
import { courseGetAction } from "../redux/feature/course/courseAction";
import { useUserSigngOut } from "../components/context/UserSigngOut";
// import { useSuccessMsgContext } from "../components/context/SuccessMsgContext";
import Cookies from "js-cookie";
const UserDashboard = () => {
  const dispatch = useDispatch();
  const { handleErrorMsg } = useErrorMsgContext();
  // const { handleSuccessMsg } = useSuccessMsgContext();
  const { handleSignOut } = useUserSigngOut();

  useEffect(() => {
    if (Cookies.get("token")) {
      const res = setTimeout(() => {
        dispatch(userAuthGetAction());
        dispatch(courseGetAction());
      }, 500);
      return () => {
        return clearTimeout(res);
      };
    }
  }, [dispatch]);

  const { userAuthGetAct, userData } = useSelector((state) => {
    return state.userAuth;
  });

  const { courseData } = useSelector((state) => {
    return state.course;
  });

  useEffect(() => {
    if (userAuthGetAct?.isSuccess) {
      dispatch(resetUserAuth());
    }
  }, [dispatch, userAuthGetAct]);

  useEffect(() => {
    const rse = () => {
      if (userAuthGetAct?.isError) {
        handleErrorMsg({
          actionResponse: userAuthGetAct?.errorResponse,
          msg: "Error in login",
          actionResolve: () => {
            dispatch(resetUserAuth());
          },
        });
      }
    };
    return () => {
      return rse();
    };
  }, [userAuthGetAct, handleErrorMsg, dispatch]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[400px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        {userAuthGetAct?.isLoading ? (
          <PageLoading />
        ) : (
          <div className=" grid grid-cols-12 gap-4">
            <div className="col-span-12 text-center">
              <h4>User Details</h4>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Name:</span>
              <span>{userData?.name || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Email:</span>
              <span>{userData?.email || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Mobile:</span>
              <span>{userData?.mobile || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Fee:</span>
              <span>{courseData?.fee || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Nationality:</span>
              <span>{courseData?.nationality || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Course:</span>
              <span>{courseData?.course || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Level:</span>
              <span>{courseData?.level || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Amount:</span>
              <span>{courseData?.amount || ""}</span>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <ButtonBox to={"/edit"} className={"w-[100%] sm:w-auto"}>
                  Edit
                </ButtonBox>
                <ButtonCancle
                  onClick={handleSignOut}
                  className={"w-[100%] sm:w-auto"}
                >
                  Logout
                </ButtonCancle>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
