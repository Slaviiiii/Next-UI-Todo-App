import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
  Input,
} from "@nextui-org/react";
import {
  faCheck,
  faEdit,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Todo(props: any) {
  const [isComplete, setIsComplete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(props.todo);
  const [editError, setEditError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editedTodo === "") {
      setEditError(true);
      return;
    }

    setEditMode(false);
    setEditError(false);
    props.editTodo(props.todo, editedTodo);
    setIsModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditError(false);
    setEditedTodo(props.todo);
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 bg-secondary rounded-md mb-5 shadow-md flex items-center justify-between">
      {isComplete ? (
        <span className="line-through">{props.todo}</span>
      ) : (
        <span>{props.todo}</span>
      )}

      <div>
        {isComplete ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="mx-2 cursor-pointer"
            onClick={() => setIsComplete(!isComplete)}
          />
        ) : (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              className="mx-2 cursor-pointer"
              onClick={() => setIsComplete(!isComplete)}
            />
          </>
        )}
        <FontAwesomeIcon
          icon={faEdit}
          className="mx-2 cursor-pointer"
          onClick={handleEditClick}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="mx-2 cursor-pointer"
          onClick={() => props.deleteTodo(props.todo)}
        />

        <Modal
          backdrop="opaque"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="2xl"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Edit Todo</ModalHeader>
            <ModalBody>
              {editError ? (
                <p className="text-red-500 p-2 rounded-lg">Todo is missing!</p>
              ) : (
                ""
              )}
              <Input
                label="Edit your todo"
                value={editedTodo}
                onChange={(value) => setEditedTodo(value.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={handleCancelEdit}>
                Close
              </Button>
              <Button color="secondary" onClick={handleSaveEdit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
