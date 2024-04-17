import { Dayjs } from "dayjs";

export default interface Todo {
  id: string;
  title: string;
  assignee: string;
  createdAt: Dayjs;
  dueDate: Dayjs;
  priority: number;
  type: string;
  details: string;
  tags: string[];
  completed: boolean;
}
