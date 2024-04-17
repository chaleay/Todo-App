import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Todo from "../models/Todo";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import NearMeIcon from "@mui/icons-material/NearMe";
import Person2Icon from "@mui/icons-material/Person2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddTodoOptionRow from "./AddTodoOptionRow";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddTodoProps {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  onAddTodo: (todo: Todo) => void;
  onAddTodoPanel: () => void;
  existingTodo?: Todo;
}

export default function AddTodo({
  textColor = "white",
  backgroundColor = "#282828",
  onAddTodoPanel,
  onAddTodo,
  existingTodo,
}: AddTodoProps) {
  const fontSize = "1.1rem";
  const borderRadius = "20px";

  const [title, setTitle] = useState(existingTodo?.title || "New Task #1");

  // convert to UTC later
  const [dueDate, setDueDate] = useState<Dayjs | null>(
    existingTodo?.dueDate || dayjs("2024-05-31T15:30")
  );
  const [priority, setPriority] = useState(existingTodo?.priority || 2);
  const [details, setDetails] = useState(existingTodo?.details || "");
  const [tags, setTags] = useState<string[]>(existingTodo?.tags || [""]);

  // for tag input
  const [curTagValue, setCurTagValue] = useState("");

  const handleKeyUp = (e) => {
    if (e.keyCode == 13 && curTagValue.length > 1) {
      console.log(curTagValue);
      setTags(() => [...tags, curTagValue.toLowerCase()]);
      setCurTagValue(() => "");
    }
  };

  function handleCreateTodo() {
    if (!title || !dueDate) return;
    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      assignee: "Me",
      createdAt: dayjs(),
      dueDate: dueDate,
      priority: priority,
      type: "Personal",
      details: details,
      tags: tags,
      completed: false,
    };
    console.log(newTodo);
    onAddTodo(newTodo);
    onAddTodoPanel();
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "fit-content",
        height: "100%",
        width: "100%",
        borderRadius,
        backgroundColor,
        color: textColor,
        py: "1%",
        px: "3rem",
      }}
    >
      <IconButton
        sx={{ color: textColor, alignSelf: "end" }}
        aria-label="delete"
        onClick={() => onAddTodoPanel()}
      >
        <CloseIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <TextField
        sx={{
          py: "2%",
          input: { color: textColor, fontSize: "2rem", fontWeight: "500" },
        }}
        hiddenLabel
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="standard-basic"
        placeholder="New Task"
        variant="standard"
      />
      <AddTodoOptionRow rowName="Assignee" fontSize={fontSize}>
        <Person2Icon sx={{ fontSize: "2rem" }} />
        <Typography sx={{ fontSize: "1rem" }}>Me</Typography>
      </AddTodoOptionRow>
      <AddTodoOptionRow rowName="Status" fontSize={fontSize}>
        <Button
          sx={{
            backgroundColor: "#ffcc00",
            color: "black",
            textTransform: "none",
            borderRadius,
            width: "50%",
            "&:hover": {
              background: "#e9a512",
            },
          }}
          variant="contained"
        >
          Pending
        </Button>
      </AddTodoOptionRow>
      <AddTodoOptionRow fontSize={fontSize} rowName="Due Date">
        <DateTimePicker
          sx={{
            ".MuiInputBase-input": { color: textColor },
            ".MuiOutlinedInput-notchedOutline": { borderColor: textColor },
          }}
          value={dueDate}
          onChange={(newDate) => setDueDate(newDate)}
        />
      </AddTodoOptionRow>
      <AddTodoOptionRow fontSize={fontSize} rowName="Task Priority">
        <FormControl
          sx={{
            width: "100%",
            backgroundColor:
              (priority === 2 && "#ce051f") ||
              (priority === 1 && "#ffcc00") ||
              (priority === 0 && "green"),
            borderRadius,
          }}
        >
          <InputLabel
            sx={{ color: "white" }}
            id="simple-select-autowidth-label"
          >
            Priority
          </InputLabel>
          <Select
            labelId="simple-select-autowidth-label"
            id="simple-select-autowidth"
            onChange={(e) => setPriority(Number(e.target.value))}
            value={priority}
            label="priority"
            inputProps={{ sx: { color: textColor } }}
          >
            <MenuItem value={0}>Low</MenuItem>
            <MenuItem value={1}>Medium</MenuItem>
            <MenuItem value={2}>High</MenuItem>
          </Select>
        </FormControl>
      </AddTodoOptionRow>
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          gap: "3%",
        }}
      >
        <Typography sx={{ fontSize: fontSize, fontWeight: "bold" }}>
          Details
        </Typography>
        <TextField
          multiline
          rows={3}
          InputProps={{ sx: { color: textColor } }}
          sx={{
            borderRadius,
            backgroundColor: "#161616",
            input: { color: textColor },
          }}
          id="filled-basic"
          variant="filled"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Typography sx={{ fontSize: fontSize, fontWeight: "bold" }}>
          Tags (Press Enter to Add)
        </Typography>
        <TextField
          sx={{
            borderRadius,
            backgroundColor: "#161616",
            input: { color: textColor },
          }}
          id="filled-basic"
          variant="filled"
          onKeyDown={handleKeyUp}
          value={curTagValue}
          onChange={(e) => setCurTagValue(e.target.value)}
        />
      </Box>
      <Button
        sx={{
          alignSelf: "end",
          fontSize: "1.5rem",
          width: "20%",
          height: "10%",
          backgroundColor: "#ce051f",
          color: "white",
          textTransform: "none",
          borderRadius,
          "&:hover": {
            background: "#ae051f",
          },
        }}
        onClick={handleCreateTodo}
        startIcon={<NearMeIcon />}
        variant="contained"
      >
        Create
      </Button>
    </Box>
  );
}
