import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Todo from "../models/Todo";
import { Height } from "@mui/icons-material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Person2Icon from "@mui/icons-material/Person2";
import { Typography } from "@mui/material";

interface AddTodoOptionRowProps {
  rowName: string;
  children: React.ReactNode;
  fontSize: string;
}

export default function AddTodoOptionRow({
  children,
  rowName,
  fontSize = "1.2rem",
}: AddTodoOptionRowProps) {
  return (
    <Box sx={{ display: "flex", my: "1%", width: "40%", alignItems: "center" }}>
      <Typography sx={{ width: "50%", fontSize: fontSize }}>
        {rowName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "start",
          alignItems: "inherit",
          gap: "8px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
