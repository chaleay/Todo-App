import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";

interface TextFieldSearchProps {
  label: string;
  width: string;
  borderRadius: string;
  additionalProperties?: object;
  color: string;
  bgColor: string;
  onSetTags: (tag: string) => void;
}

export default function TextFieldSearch({
  label,
  width = "75%",
  borderRadius = "100px",
  color = "white",
  bgColor = "black",
  additionalProperties,
  onSetTags,
}: TextFieldSearchProps) {
  const [curValue, setCurValue] = useState("");

  function handleCurValue(val: string) {
    setCurValue(() => val);
    onSetTags(val.length > 1 ? val : "");
  }

  const handleKeyUp = (e: { keyCode: number }) => {
    if (e.keyCode == 13) {
      onSetTags(curValue);
    }
  };

  return (
    <TextField
      onKeyDown={handleKeyUp}
      fullWidth={true}
      id="filled-basic"
      placeholder={label}
      variant="outlined"
      value={curValue}
      onChange={(e) => handleCurValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment sx={{ color }} position="start">
            <AccessTimeIcon />
          </InputAdornment>
        ),
        sx: {
          borderRadius: borderRadius,
          width: width,
          color,
          backgroundColor: bgColor,
          ...additionalProperties,
        },
      }}
    />
  );
}
