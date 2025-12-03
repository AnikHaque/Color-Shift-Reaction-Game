import Column from "./Column";

export default function TaskBoard({ searchText, setEditTask, openModal }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <div className="flex flex-col gap-6 xl:flex-row p-4 sm:p-6 lg:p-8 flex-1 min-h-0">
        <Column status="todo" title="To-do" setEditTask={setEditTask} openModal={openModal} searchText={searchText} />
        <Column status="in-progress" title="In Progress" setEditTask={setEditTask} openModal={openModal} searchText={searchText} />
        <Column status="done" title="Done" setEditTask={setEditTask} openModal={openModal} searchText={searchText} />
      </div>
    </div>
  );
}
