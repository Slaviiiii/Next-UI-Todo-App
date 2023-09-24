"use client";
import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Switch as NextUISwitch } from "@nextui-org/react";
import TodoList from "./components/todoList";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [addError, setAddError] = useState(false);

  const { theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? "dark" : theme;

  const handleThemeSwitch = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const changeTodo = (value: string) => {
    setTodo(value);
    setAddError(false);
  };

  const addTodo = (todoText: string) => {
    if (todoText === "") {
      setAddError(true);
      return;
    }

    const updatedTodos: any = [...todos, todoText];

    setAddError(false);
    setTodo("");
    setTodos(updatedTodos);
    onOpenChange();
  };

  const deleteTodo = (todoToDelete: string) => {
    const newTodos = todos.filter((todo) => todo !== todoToDelete);
    setTodos(newTodos);
  };

  const editTodo = (oldTodo: string, newTodo: string) => {
    const updatedTodos: any = todos.map((todo) =>
      todo === oldTodo ? newTodo : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div
      className={`flex flex-col items-center h-screen pt-36 ${
        currentTheme === "dark" ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <Card
        className={`w-4/12 p-11 ${
          currentTheme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <div className="flex justify-end mb-6">
          <div className="ml-2">
            <NextUISwitch
              defaultSelected={currentTheme === "dark"}
              size="lg"
              color="secondary"
              thumbIcon={({ isSelected, className }) => (
                <FontAwesomeIcon
                  icon={isSelected ? faSun : faMoon}
                  className={className}
                  style={{ color: isSelected ? "dark" : "dark" }}
                />
              )}
              onChange={handleThemeSwitch}
            ></NextUISwitch>
          </div>
        </div>

        <p className="text-center mb-10 text-5xl font-bold">Get things done!</p>

        <Button
          className="text-3xl text-center p-6"
          color="secondary"
          variant="ghost"
          onPress={onOpen}
        >
          Add a new todo +
        </Button>

        <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />

        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          classNames={{
            backdrop:
              currentTheme === "dark"
                ? "bg-gradient-to-t from-gray-900 to-gray-900/10 backdrop-opacity-20"
                : "bg-gradient-to-t from-gray-200 to-gray-200/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Todo
                </ModalHeader>
                <ModalBody>
                  {addError ? (
                    <p className="text-red-500 p-2 rounded-lg">
                      Todo is missing!
                    </p>
                  ) : (
                    ""
                  )}
                  <Input
                    label="Write your todo"
                    onChange={(value) => changeTodo(value.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="secondary" onClick={() => addTodo(todo)}>
                    Add Todo
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Card>
    </div>
  );
}
