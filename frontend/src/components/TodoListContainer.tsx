import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TodoList from "./TodoList";
import Todo from "../models/Todo";
import { useState } from "react";
import { Sorting } from "../models/enums";

interface TodoListProps {
  textColor: string;
  borderColor: string;
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onAddTodoPanel: () => void;
  onChangeSort: (type: Sorting) => void;
  onDeleteTodo: (id: string) => void;
  sort: Sorting;
  filter: string;
  tags: string;
}

export default function TodoListContainer({
  textColor = "white",
  borderColor = "black",
  todos,
  onToggleTodo,
  onDeleteTodo,
  onAddTodoPanel,
  sort,
  onChangeSort,
  filter,
  tags,
}: TodoListProps) {
  return (
    <Box
      sx={{
        p: "2rem",
        border: `4px solid ${borderColor}`,
        borderRadius: "20px",
        maxWidth: "90%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography fontWeight={"bold"} color={textColor} variant="h4">
          Today's Tasks
        </Typography>
        <FormControl
          sx={{
            flexGrow: 1,
            ml: "70%",
            borderRadius: "64px",
            backgroundColor: "#282828",
          }}
        >
          <InputLabel
            sx={{ color: "white" }}
            id="simple-select-autowidth-label"
          >
            Sort By...
          </InputLabel>
          <Select
            labelId="simple-select-autowidth-label"
            id="simple-select-autowidth"
            onChange={(e) => onChangeSort(Number(e.target.value))}
            value={sort}
            label="sort"
            inputProps={{ sx: { color: textColor } }}
          >
            <MenuItem value={Sorting.completion}>By Completion</MenuItem>
            <MenuItem value={Sorting.alphabetical}>By Name</MenuItem>
            <MenuItem value={Sorting.newest}>By Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: "1.5rem" }}>
        <TodoList
          tags={tags}
          filter={filter}
          sort={sort}
          borderColor={borderColor}
          onDeleteTodo={onDeleteTodo}
          onAddTodoPanel={onAddTodoPanel}
          onToggleTodo={onToggleTodo}
          todos={todos}
          textColor="white"
        ></TodoList>
      </Box>
    </Box>
  );
}
