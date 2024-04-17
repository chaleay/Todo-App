import AddIcon from "@mui/icons-material/Add";
import Todo from "../models/Todo";
import List from "@mui/material/List";
import TodoElement from "./TodoElement";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Sorting } from "../models/enums";
import dayjs from "dayjs";

interface TodoListProps {
  textColor: string;
  borderColor: string;
  todos: Todo[];
  sort: Sorting;
  onToggleTodo: (id: string) => void;
  onAddTodoPanel: () => void;
  onDeleteTodo: (id: string) => void;
  filter: string;
  tags: string;
}

export default function TodoList({
  todos,
  textColor = "white",
  borderColor = "black",
  onToggleTodo,
  onAddTodoPanel,
  onDeleteTodo,
  sort,
  filter,
  tags = "",
}: TodoListProps) {
  function dateSort(a: Todo, b: Todo): number {
    return b.createdAt.diff(a.createdAt);
  }

  function applyTagFilter(todo: Todo) {
    // very inefficient. in the real world we wouldn't do this
    const normalizedTags = todo.tags.map((t) => t.toLowerCase());
    if (typeof tags === "string")
      return tags.length > 1
        ? normalizedTags.includes(tags.toLowerCase())
        : todo;
  }

  function applyFilter(todo: Todo) {
    const filtered =
      filter === "completed"
        ? todo.completed
        : filter === "upcoming"
        ? dayjs().isBefore(todo.dueDate)
        : todo;
    return filtered;
  }

  return (
    <>
      <Button
        sx={{
          textTransform: "none",
          color: textColor,
          border: `1px solid ${borderColor}`,
          py: ".75rem",
          justifyContent: "start",
          borderRadius: "20px",
        }}
        onClick={() => onAddTodoPanel()}
        fullWidth={true}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        <Typography sx={{ ml: "1.5rem" }}>Add New Task</Typography>
      </Button>
      <List sx={{ width: "100%", color: textColor }}>
        {sort === Sorting.completion && (
          <>
            {todos
              .filter(applyTagFilter)
              .filter(applyFilter)
              .filter((todo) => !todo.completed)
              .map((todo) => {
                return (
                  <TodoElement
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onToggleTodo={onToggleTodo}
                    checked={todo.completed}
                    textColor="white"
                  />
                );
              })}
            {todos
              .filter(applyTagFilter)
              .filter(applyFilter)
              .filter((todo) => todo.completed)
              .map((todo) => {
                return (
                  <TodoElement
                    todo={todo}
                    onToggleTodo={onToggleTodo}
                    onDeleteTodo={onDeleteTodo}
                    checked={todo.completed}
                    textColor="white"
                  />
                );
              })}
          </>
        )}
        {sort === Sorting.alphabetical && (
          <>
            {todos
              .filter(applyTagFilter)
              .filter(applyFilter)
              .sort((a: Todo, b: Todo) => a.title.localeCompare(b.title))
              .map((todo) => {
                return (
                  <TodoElement
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onToggleTodo={onToggleTodo}
                    checked={todo.completed}
                    textColor="white"
                  />
                );
              })}
          </>
        )}
        {sort === Sorting.newest && (
          <>
            {todos
              .filter(applyTagFilter)
              .filter(applyFilter)
              .sort(dateSort)
              .map((todo) => {
                return (
                  <TodoElement
                    onDeleteTodo={onDeleteTodo}
                    todo={todo}
                    onToggleTodo={onToggleTodo}
                    checked={todo.completed}
                    textColor="white"
                  />
                );
              })}
          </>
        )}
      </List>
    </>
  );
}
