import { Select } from "@mantine/core";
import PropTypes from "prop-types";

export const SelectBox = ({
  value,
  onChange = () => {},
  placeholder,
  error,
  label,
  options,
  disabled = false
}) => {
  return (
    <div>
      <Select
        styles={{
          label: {
            color: error ? "#F6373A" : "#581D9E",
          },
        }}
        label={label || "Input label"}
        value={value}
        placeholder={placeholder}
        data={options || ["React", "Angular", "Vue", "Svelte"]}
        error={error}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

SelectBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool
};
