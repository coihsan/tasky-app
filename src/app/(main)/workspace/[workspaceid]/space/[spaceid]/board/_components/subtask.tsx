"use client";

import { JSX, SVGProps, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish project proposal", completed: false },
    { id: 2, title: "Schedule meeting with client", completed: false },
    { id: 3, title: "Buy groceries", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const handleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const handleTaskDeletion = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const handleNewTaskInput = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewTask(e.target.value);
  };
  const handleNewTaskSubmit = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), title: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-background rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleNewTaskInput}
          className="flex-1 mr-2 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Button onClick={handleNewTaskSubmit}>Add</Button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-muted rounded-md p-2"
          >
            <div className="flex items-center">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                className="mr-2"
                onCheckedChange={() => handleTaskCompletion(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {task.title}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleTaskDeletion(task.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
