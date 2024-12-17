import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../components/helpers/Validations";
import {
  InputNumberLable,
  InputPasswordLable,
  InputTextLable,
} from "../components/common/InputFields";
import { ButtonBox, ButtonLoading } from "../components/common/Button";
import { useErrorMsgContext } from "../components/context/ErrorMsgContext";
import { useSuccessMsgContext } from "../components/context/SuccessMsgContext";
import { useDispatch, useSelector } from "react-redux";
import { resetUserAuth } from "../redux/feature/userAuth/userAuthSlice";
import { userAuthSingUpAction } from "../redux/feature/userAuth/userAuthActions";
import { SelectBox } from "../components/common/SelectCustom";
import { ALL_COURSES, ALL_LEVEL } from "../components/helpers/otherHelpers";
import {
  feesGetApplicationAction,
  feesGetExamAction,
} from "../redux/feature/fees/feesAction";
import { resetCourse } from "../redux/feature/course/courseSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");

  const [feeType, setFeeType] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [course, setCourse] = useState(null);
  const [level, setLevel] = useState(null);
  const [amount, setAmount] = useState(null);

  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  const [feeAllData, setFeeAllData] = useState({});

  const [formError, setFormError] = useState({});
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  let formErr = {};

  useEffect(() => {
    const resCall = () => {
      dispatch(feesGetExamAction());
      dispatch(feesGetApplicationAction());
    };
    return () => {
      return resCall();
    };
  }, [dispatch]);

  const { userAuthSingUpAct } = useSelector((state) => {
    return state.userAuth;
  });

  const { examFees, applicationFess } = useSelector((state) => {
    return state.fees;
  });

  useEffect(() => {
    if (examFees && applicationFess) {
      setFeeAllData({
        "Exam Fee": examFees["Exam Fee"],
        "Application Fee": applicationFess["Application Fee"],
      });
    }
  }, [examFees, applicationFess]);

  useEffect(() => {
    if (feeType) {
      const nationalities = Object.keys(feeAllData[feeType] || {});
      setNationalityOptions(nationalities || []);
    }
    setNationality(null);
    setCourse(null);
    setLevel(null);
    setAmount(null);
  }, [feeType]);

  useEffect(() => {
    if (nationality && feeType) {
      const courses = feeAllData[feeType]?.[nationality]?.ALL_COURSES
        ? ALL_COURSES
        : Object.keys(feeAllData[feeType]?.[nationality] || {});
      setCourseOptions(courses || []);
    }
    setCourse(null);
    setLevel(null);
    setAmount(null);
  }, [nationality, feeType]);

  useEffect(() => {
    if (course && nationality && feeType) {
      const courseData = feeAllData?.[feeType]?.[nationality]?.ALL_COURSES;
      const levels = courseData?.["ALL_LEVEL"]
        ? ALL_LEVEL
        : Object.keys(courseData);
      setLevelOptions(levels || []);
    }
    setLevel(null);
    setAmount(null);
  }, [course, nationality, feeType]);

  useEffect(() => {
    if (level && course && nationality && feeType) {
      const courseData = feeAllData?.[feeType]?.[nationality]?.ALL_COURSES;
      const fee = courseData?.["ALL_LEVEL"]
        ? courseData?.["ALL_LEVEL"]?.amount || null
        : courseData?.[level]
        ? courseData?.[level]?.amount
        : null;
      setAmount(fee);
    } else {
      setAmount(null);
    }
  }, [level, course, nationality, feeType]);

  const handleFormError = () => {
    if (String(name).trim().length === 0) {
      formErr.name = "Name is required";
    }
    if (String(mobile).trim().length === 0) {
      formErr.mobile = "Mobile is required";
    }
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
    if (String(repeatePassword).trim().length === 0) {
      formErr.repeatePassword = "Repeate Password is required";
    } else if (!validatePassword(repeatePassword)) {
      formErr.repeatePassword =
        "Repeate Password use 8 charater, atleast one uppercase, atleast one number, atleast one symbol";
    }

    if (String(feeType).trim().length === 0) {
      formErr.feeType = "Fee Type is required";
    }
    if (String(nationality).trim().length === 0) {
      formErr.nationality = "Nationality is required";
    }
    if (String(course).trim().length === 0) {
      formErr.course = "Course is required";
    }
    if (String(level).trim().length === 0) {
      formErr.level = "Level is required";
    }
    if (String(amount).trim().length === 0) {
      formErr.amount = "Amount is required";
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
        email: String(email).toLowerCase(),
        mobile,
        password,
        fee: feeType,
        nationality: nationality,
        course: course,
        level: level,
        amount: amount,
      };
      dispatch(userAuthSingUpAction({ formData }));
    }
  };

  useEffect(() => {
    if (userAuthSingUpAct?.isError) {
      handleErrorMsg({
        actionResponse: userAuthSingUpAct?.errorResponse,
        msg: "Error in login",
        actionResolve: () => {
          dispatch(resetUserAuth());
          dispatch(resetCourse());
        },
        isNeedAction401: false,
      });
    }
  }, [userAuthSingUpAct, handleErrorMsg, dispatch]);

  useEffect(() => {
    if (userAuthSingUpAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: userAuthSingUpAct?.successMsg,
        msg: "Successfully signup",
        actionResolve: () => {
          dispatch(resetUserAuth());
          dispatch(resetCourse());
          navigate("/login");
          setName("");
          setMobile("");
          setEmail("");
          setPassword("");
          setRepeatePassword("");
          setFeeType(null);
          setNationality(null);
          setCourse(null);
          setLevel(null);
          setAmount(null);
        },
      });
    }
  }, [userAuthSingUpAct, dispatch, handleSuccessMsg, navigate]);

  return (
    <div className="bg-whiteOne  flex justify-center items-center px-4 py-5">
      <div className=" w-[100%] md:w-[60%]  px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Register</h4>
          </div>
          <div className="col-span-12 md:col-span-6">
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
          <div className="col-span-12 md:col-span-6">
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
          <div className="col-span-12 md:col-span-6">
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
          <div className="col-span-12 md:col-span-6">
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
          <div className="col-span-12 md:col-span-6">
            <InputPasswordLable
              value={repeatePassword}
              placeholder={"Enter Repeate Password"}
              onChange={(e) => {
                setRepeatePassword(e.target.value);
                if (password.trim() !== e.target.value.trim()) {
                  setFormError({
                    ...formError,
                    repeatePassword: "Password and Repeate Password are same",
                  });
                } else {
                  delete formError?.repeatePassword;
                }
              }}
              label={"Repeate Password"}
              error={formError?.repeatePassword}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectBox
              label={"Fee Type"}
              placeholder={"Select Fee Type"}
              value={feeType}
              onChange={(e) => {
                setFeeType(e);
                delete formError?.feeType;
              }}
              error={formError?.feeType}
              options={Object.keys(feeAllData)}
              // disabled={feeType ? true : false}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectBox
              label={"Nationality"}
              placeholder={"Select Nationality"}
              value={nationality}
              onChange={(e) => {
                setNationality(e);
                delete formError?.nationality;
              }}
              options={nationalityOptions}
              error={formError?.nationality}
              // disabled={nationality ? true : false}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectBox
              label={"Course"}
              placeholder={"Select course"}
              value={course}
              onChange={(e) => {
                setCourse(e);
                delete formError?.course;
              }}
              options={courseOptions}
              error={formError?.course}
              // disabled={course ? true : false}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectBox
              label={"Level"}
              placeholder={"Select level"}
              value={level}
              onChange={(e) => {
                setLevel(e);
                delete formError?.level;
              }}
              options={levelOptions}
              error={formError?.level}
              // disabled={level ? true : false}
            />
          </div>
          <>
            {amount && feeType && nationality && course && level && (
              <div className="amount-display col-span-12 md:col-span-6">
                <h3>Fee Amount: {amount}</h3>
              </div>
            )}
          </>
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={userAuthSingUpAct?.isLoading ? "" : "submit"}>
              {userAuthSingUpAct?.isLoading ? <ButtonLoading /> : "Sign up"}
            </ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <span>Already have account?</span> <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
