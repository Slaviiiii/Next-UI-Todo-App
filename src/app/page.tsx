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
import Todo from "./todo";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [todos, setTodos] = useState([]);

  return (
    <Card className="flex flex-col items-center gap-4">
      <Button
        className="w-5/6 text-white text-lg"
        color="primary"
        variant="shadow"
        onPress={onOpen}
      >
        Add a new todo +
      </Button>

      <div>
        {todos ? (
          todos.map((todo: string) => <Todo {...{ todo }} />)
        ) : (
          <p>There are no todos</p>
        )}
      </div>

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
                <Input label="Write your todo" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">Action</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
