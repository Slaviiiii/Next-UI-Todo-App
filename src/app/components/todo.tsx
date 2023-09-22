import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Todo(props: any) {
  const [isComplete, setIsComplete] = useState(false);

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
          <FontAwesomeIcon
            icon={faCheck}
            className="mx-2 cursor-pointer"
            onClick={() => setIsComplete(!isComplete)}
          />
        )}

        <FontAwesomeIcon icon={faEdit} className="mx-2 cursor-pointer" />
        <FontAwesomeIcon
          icon={faTrash}
          className="mx-2 cursor-pointer"
          onClick={() => props.deleteTodo(props.todo)}
        />
      </div>
    </div>
  );
}
