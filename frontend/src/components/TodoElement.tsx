import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { pink } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Todo from "../models/Todo";
import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

interface TodoProps {
  todo: Todo;
  textColor: string;
  onToggleTodo: (id: string) => void;
  checked: boolean;
  onDeleteTodo: (id: string) => void;
}

export default function TodoElement({
  todo,
  textColor = "white",
  onToggleTodo,
  onDeleteTodo,
  checked,
}: TodoProps) {
  const labelId = `checkbox-list-label-${todo.id}`;

  return (
    <>
      <ListItem
        key={todo.id}
        secondaryAction={
          <>
            <IconButton
              onClick={() => onDeleteTodo(todo.id)}
              edge="end"
              aria-label="MoreDetails"
            >
              <DeleteIcon sx={{ color: textColor }} />
            </IconButton>
            <IconButton edge="end" aria-label="MoreDetails">
              <ArrowForwardIosIcon sx={{ color: textColor }} />
            </IconButton>
          </>
        }
        disablePadding
      >
        <ListItemButton
          role={undefined}
          onClick={() => onToggleTodo(todo.id)}
          dense
        >
          <ListItemIcon>
            <Checkbox
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
              edge="start"
              checked={checked}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              flexGrow: 0,
              flexWrap: "wrap",
              width: "20%",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            id={labelId}
            primary={todo.title}
          />
        </ListItemButton>
      </ListItem>
      {!todo.completed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pl: "16px",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "60px" }}></Box>
          <Box sx={{ display: "flex", width: "12%" }}>
            <CalendarMonthIcon sx={{ mr: "3%" }} />
            <Typography sx={{ fontSize: ".9rem" }}>
              {dayjs().isAfter(todo.dueDate) ? (
                <>
                  <em>
                    Was Due on {todo.dueDate.month() + 1}
                    {todo.dueDate.date()}
                  </em>
                </>
              ) : (
                <>
                  Due on {`${todo.dueDate.month() + 1}/${todo.dueDate.date()}`}
                </>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "20%" }}>
            {todo.tags.map((tag) => {
              if (tag.length < 2) {
                return;
              }
              return (
                <Typography
                  sx={{
                    backgroundColor: "#e41d23",
                    borderRadius: "60px",
                    px: "2px",
                    fontSize: ".8rem",
                    mx: "2px",
                  }}
                >
                  {`#${tag}`}
                </Typography>
              );
            })}
          </Box>
          <Box sx={{ display: "flex" }}>
            <CircleIcon
              sx={{
                mr: "10px",
                color:
                  todo.priority === 2
                    ? "#ce051f"
                    : todo.priority === 1
                    ? "#ffcc00"
                    : "green",
              }}
            />
            <Typography>{todo.type}</Typography>
          </Box>
        </Box>
      )}
      <Divider sx={{ borderColor: "#3b3835" }} />
    </>
  );
}
