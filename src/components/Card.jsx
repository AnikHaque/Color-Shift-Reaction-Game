import { useContext, useState } from "react";
import { TaskContext } from "../TaskContext";
import DeleteModal from "./DeleteModal";
import tagColors from "../utils/tagColors";
import CalendarIcon from "../svg/CalendarIcon";

export default function Card({ task, setEditTask, openModal }) {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const moveTo = (status) => {
    updateTask({ ...task, status });
    setMenuOpen(false);
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteTask(task.id);
          setDeleteOpen(false);
        }}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-4 relative hover:shadow-md">
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg py-2 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="px-4 pb-2 text-xs font-semibold text-gray-400">
                Move to
              </p>

              {["todo", "in-progress", "done"]
                .filter((s) => s !== task.status)
                .map((s) => (
                  <button
                    key={s}
                    className="w-full text-left px-4 py-1 hover:bg-gray-50"
                    onClick={() => moveTo(s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}

              <div className="border-t mt-2 pt-2 space-y-1">
                <button
                  className="w-full text-left px-4 py-1 hover:bg-gray-50"
                  onClick={() => {
                    setEditTask(task);
                    openModal();
                    setMenuOpen(false);
                  }}
                >
                  Edit
                </button>

                <button
                  className="w-full text-left px-4 py-1 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setDeleteOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
        <p className="text-xs text-gray-600 mb-2">{task.description}</p>

        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            tagColors[task.tag]
          }`}
        >
          {task.tag}
        </span>

        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <CalendarIcon />
          {task.date} 
        </p>
      </div>
    </>
  );
}
