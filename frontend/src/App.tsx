import LeftPermanentDrawer from "./components/Drawer";
import { Box, Container, Typography } from "@mui/material";
import TodoListContainer from "./components/TodoListContainer";
import Todo from "./models/Todo";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import dayjs, { Dayjs } from "dayjs";
import { Sorting } from "./models/enums";

// needed components
// side navbar left
// * option to filter by completed
// * option to filter by upcoming
// * input to filter by tags
// container to right
// . box in container with tasks
// .. box contains sorting options for recently created, alphabetical order
// .. box contains list of todo items
// .. box to click to add a new todo that leads to new page

// A Todo should contain:
// * Assignee (Me)
// * status (Pending)
// * Due Date (date selctor)
// * Priority (specify text and color)
// * Details
// * tags

const mockTodos: Todo[] = [
  {
    id: "5247beb9-b979-456d-9d00-d4534afee3f4",
    title: "Help Mom wash the dishes",
    assignee: "Elijah",
    createdAt: dayjs("2023-06-09"),
    dueDate: dayjs("2023-07-30"),
    priority: 0,
    type: "personal",
    details: "Mom needs alot of help",
    tags: ["mom"],
    completed: false,
  },
  {
    id: "9fc68b4f-b503-4f1d-9b88-fcb03f635ba8",
    title: "Go out to Dinner",
    assignee: "Elijah",
    createdAt: dayjs("2023-12-10"),
    dueDate: dayjs("2024-06-30"),
    priority: 1,
    type: "personal",
    details: "I'm freaking starving",
    tags: ["hungry"],
    completed: false,
  },
  {
    id: "59e4c29f-7327-4237-ab50-47140794817b",
    title: "Do Coding Test",
    assignee: "Elijah",
    createdAt: dayjs(),
    dueDate: dayjs("2024-05-01"),
    priority: 2,
    type: "work",
    details: "Work hard.",
    tags: ["coding", "react"],
    completed: false,
  },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [addTodoPanel, setAddTodoPanel] = useState(false);
  const [sort, setSort] = useState(Sorting.completion);
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useState("");

  function handleAddTodo(todo: Todo): void {
    setTodos((todos) => [...todos, todo]);
  }

  function handleAddTodoPanel(): void {
    setAddTodoPanel(() => !addTodoPanel);
  }
  // function handleDeleteTodo(id: number): void {
  //   setTodos((todos) => todos.filter((todo) => todo.id !== id));
  // }

  function handleToggleTodo(id: string) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    console.log(todos);
  }

  function handleSetFilter(newFilter: string) {
    setFilter(() => newFilter);
  }

  function handleSetTags(newTag: string) {
    setTags(() => newTag);
  }

  const drawerWidth = "20rem";
  const defaultTextColor = "white";

  return (
    <Box sx={{ display: "flex" }}>
      <LeftPermanentDrawer
        color="#282828"
        textColor={defaultTextColor}
        drawerWidth={drawerWidth}
        fontSize="1rem"
        dividerColor="#3b3835"
        onSetFilter={handleSetFilter}
        onSetTags={handleSetTags}
      />
      <Box
        sx={{
          backgroundColor: "#161616",
          flexGrow: 1,
          p: 4,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!addTodoPanel ? (
          <>
            <Typography
              sx={{ mb: "5rem" }}
              fontWeight={"bold"}
              color={defaultTextColor}
              variant="h2"
            >
              Upcoming
            </Typography>
            <TodoListContainer
              onToggleTodo={handleToggleTodo}
              onAddTodoPanel={handleAddTodoPanel}
              onChangeSort={setSort}
              todos={todos}
              sort={sort}
              filter={filter}
              tags={tags}
              textColor="white"
              borderColor="#282828"
            ></TodoListContainer>{" "}
          </>
        ) : (
          <Container sx={{ height: "100%", my: "1%" }}>
            <AddTodo
              onAddTodo={handleAddTodo}
              textColor="white"
              borderColor="#282828"
              onAddTodoPanel={handleAddTodoPanel}
              backgroundColor={"#282828"}
            ></AddTodo>
          </Container>
        )}
      </Box>
    </Box>
  );
}
