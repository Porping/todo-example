<div className="max-w-md mx-auto mt-8 p-4 shadow-lg shadow-[#E8D8C4] bg-[#E8D8C4] ">
  <ToastContainer />
  <h1 className="text-2xl font-bold mb-4 text-[#6D2932]">Todo App</h1>
  <div className="mb-4">
    <input
      type="text"
      placeholder="Add new todo"
      className="border border-[#6D2932] bg-[#C7B7A3] text-[#6D2932] placeholder:text-[#6D2932] p-2 w-full"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
          addTodo(e.currentTarget.value.trim());
          e.currentTarget.value = "";
        }
      }}
    />
  </div>
  {todos == null ? (
    <p className=" text-center text-lg font-semibold animate-pulse">No todo </p>
  ) : (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      ))}
    </>
  )}
</div>;
