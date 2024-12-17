import { Loader } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ButtonLoading = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Loader color="#fff" size={15} />
      <p className="text-[#fff] text-[15px] font-semibold">Loading...</p>
    </div>
  );
};
export const ButtonBox = ({
  children,
  type = "button",
  to,
  onClick = () => {},
  className,
}) => {
  return (
    <>
      {to ? (
        <Link
          to={to || "/"}
          className={`${className} text-center font-[500] outline-none border-none bg-primOne hover:bg-primTwo text-whiteOne hover:text-primOne  px-8 py-1.5 rounded-[6px]`}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type || "button"}
          onClick={() => {
            if (type === "button") {
              onClick();
            }
          }}
          className={`${className} text-center  font-[500] outline-none border-none bg-primOne hover:bg-primTwo text-whiteOne hover:text-primOne  px-8 py-1.5 rounded-[6px]`}
        >
          {children}
        </button>
      )}
    </>
  );
};

ButtonBox.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export const ButtonCancle = ({ children, type, to, className , onClick=()=>{}}) => {
  return (
    <>
      {to ? (
        <Link
          to={to || "/"}
          className={`${className} text-center font-[500] outline-none border-none bg-primThree hover:bg-darkOne text-darkTwo hover:text-whiteOne px-8 py-1.5 rounded-[6px]`}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type || "button"}
          onClick={onClick}
          className={`${className}  text-center font-[500] outline-none border-none bg-primThree hover:bg-darkOne text-darkTwo hover:text-whiteOne px-8 py-1.5 rounded-[6px]`}
        >
          {children}
        </button>
      )}
    </>
  );
};

ButtonCancle.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
