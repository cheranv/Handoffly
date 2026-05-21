import "./inputfields.scss";

export const InputField = ({
  label,
  type,
  placeholder,
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TextArea = ({
  label,
  placeholder,
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        rows="6"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
