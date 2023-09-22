import Todo from "./todo";

export default function TodoList(props: any) {
  const todos = props.todos;
  const deleteTodo = props.deleteTodo;

  return (
    <div className="mt-6 text-center">
      {todos.length > 0
        ? todos.map((todo: string) => (
            <Todo key={todo} todo={todo} deleteTodo={deleteTodo} />
          ))
        : ""}
    </div>
  );
}
