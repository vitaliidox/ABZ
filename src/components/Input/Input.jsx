import './input.scss';
import { TextField } from "@mui/material";

export const Input = ({
  name,
  value,
  setValue,
  isError,
  label,
  helperText,
  setIsVisited,
  setOnBlur,
}) => {

  return (
    <TextField
      name={name}
      className="input"
      id="outlined-error-helper-text"

      // sx={{
      //   marginBottom: "30px",
      //   "&:last-child": {
      //     marginBottom: "50px",
      //   },
      // }}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setIsVisited(true);
      }}
      error={isError}
      label={label}
      helperText={helperText}
      onBlur={(e) => setOnBlur(e)}
    />
  )
}
