"use client";
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
import { useState } from "react";
import TodoList from "./components/todoList";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(Array);
  const [addError, setAddError] = useState(false);

  const changeTodo = (value: string) => {
    setTodo(value);
    setAddError(false);
  };

  const addTodo = (todo: string) => {
    if (todo === "") {
      setAddError(true);
      return;
    }

    const updatedTodos = [...todos, todo];

    setAddError(false);
    setTodo("");
    setTodos(updatedTodos);
    onOpenChange();
  };

  const deleteTodo = (todoToDelete: string) => {
    const newTodos = todos.filter((todo) => todo !== todoToDelete);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center h-screen pt-36 bg-purple-500">
      <Card className="w-4/12 p-11 bg-indigo-950 text-white">
        <p className="text-center mb-10 text-5xl font-bold">Get things done!</p>

        <Button
          className="text-3xl text-center p-6"
          color="secondary"
          variant="ghost"
          onPress={onOpen}
        >
          Add a new todo +
        </Button>

        <TodoList todos={todos} deleteTodo={deleteTodo} />

        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
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
                    Action
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
