import { TextField, IconButton, InputAdornment } from "@mui/material";
import { forwardRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  error?: string;
  autoComplete?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      error,
      autoComplete,
      fullWidth = true,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <TextField
        fullWidth={fullWidth}
        variant="standard"
        placeholder={placeholder}
        label={label}
        type={isPassword ? (showPassword ? "text" : "password") : type} // ✅ Fixed toggle logic
        error={!!error}
        helperText={error}
        inputRef={ref}
        autoComplete={autoComplete}
        InputProps={
          isPassword
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        sx={{
          pb: 1,
          "& .MuiInputBase-input": {
            fontFamily: "var(--font-helvetica), sans-serif",
            paddingBottom: "16px",
            fontSize: "16px",
          },
          "& .MuiInput-underline:before": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
          },
          "& .MuiInput-underline:after": {
            borderBottom: "1px solid black !important",
          },
        }}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
