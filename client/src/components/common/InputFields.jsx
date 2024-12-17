import { Input, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PropTypes from "prop-types";

export const InputTextLable = ({
  value,
  onChange = () => {},
  placeholder,
  error,
  label,
}) => {
  return (
    <Input.Wrapper
      styles={{
        label: {
          color: error ? "#F6373A" : "#581D9E",
        },
      }}
      label={label || "Input label"}
      error={error}
    >
      <Input
        value={value || ""}
        type="text"
        onChange={onChange}
        placeholder={placeholder || "Enter"}
        styles={{
          input: {
            "&:focus": {
              borderColor: "#581D9E",
            },
          },
        }}
      />
    </Input.Wrapper>
  );
};

InputTextLable.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
};

export const InputPasswordLable = ({
  value,
  onChange = () => {},
  placeholder,
  error,
  label,
}) => {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <Input.Wrapper
      styles={{
        label: {
          color: error ? "#F6373A" : "#581D9E",
        },
      }}
      label={label || "Input label"}
      error={error}
      id="Password"
    >
      <PasswordInput
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || "Enter"}
        visible={visible}
        onVisibilityChange={toggle}
        styles={{
          input: {
            "&:focus": {
              borderColor: "#581D9E",
            },
          },
        }}
      />
    </Input.Wrapper>
  );
};

InputPasswordLable.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
};

export const InputNumberLable = ({
  value,
  onChange = () => {},
  placeholder,
  error,
  label,
}) => {
  return (
    <Input.Wrapper
      styles={{
        label: {
          color: error ? "#F6373A" : "#581D9E",
        },
      }}
      label={label || "Input label"}
      error={error}
    >
      <Input
        type="number"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || "Enter"}
        styles={{
          input: {
            "&:focus": {
              borderColor: "#581D9E",
            },
          },
        }}
      />
    </Input.Wrapper>
  );
};

InputNumberLable.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
};
