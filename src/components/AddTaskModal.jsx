import { useContext, useState } from "react";
import { TaskContext } from "../TaskContext";

export default function AddTaskModal({ closeModal, editTask }) {
  const { addTask, updateTask } = useContext(TaskContext);

  const [title, setTitle] = useState(editTask ? editTask.title : "");
  const [description, setDescription] = useState(
    editTask ? editTask.description : ""
  );
  const [tag, setTag] = useState(editTask ? editTask.tag : "Design");
  const [status, setStatus] = useState(editTask ? editTask.status : "todo");
  const [date, setDate] = useState(editTask ? editTask.date : "");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!tag) newErrors.tag = "Tag is required.";
    if (!status) newErrors.status = "Status is required.";

    if (!date) {
      newErrors.date = "Due date is required.";
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      const selected = new Date(date).setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = "Date must be today or later.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const newTask = {
      id: editTask ? editTask.id : Date.now(),
      title,
      description,
      tag,
      status,
      date,
    };

    if (editTask) updateTask(newTask);
    else addTask(newTask);

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">
          {editTask ? "Edit Task" : "Add Task"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {editTask ? "Update your card." : "Create a card for your board."}
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            Please fix the errors before submitting.
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none ${
                errors.title
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-200 focus:border-gray-900"
              }`}
              placeholder="e.g. Wireframes"
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value.substring(0, 150))}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-gray-900"
              placeholder="Add context or acceptance criteria"
            />
            <p className="text-xs text-gray-400 mt-1">
              {description.length}/150 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tag
              </label>
              <select
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                  if (errors.tag) setErrors({ ...errors, tag: null });
                }}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none ${
                  errors.tag
                    ? "border-red-500 focus:border-red-600"
                    : "border-gray-200 focus:border-gray-900"
                }`}
              >
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Creative">Creative</option>
                <option value="Development">Development</option>
                <option value="Backend">Backend</option>
                <option value="Setup">Setup</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Documentation">Documentation</option>
              </select>
              {errors.tag && (
                <p className="text-red-600 text-xs mt-1">{errors.tag}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) setErrors({ ...errors, date: null });
                }}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none ${
                  errors.date
                    ? "border-red-500 focus:border-red-600"
                    : "border-gray-200 focus:border-gray-900"
                }`}
              />
              {errors.date && (
                <p className="text-red-600 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (errors.status)
                    setErrors({ ...errors, status: null });
                }}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none ${
                  errors.status
                    ? "border-red-500 focus:border-red-600"
                    : "border-gray-200 focus:border-gray-900"
                }`}
              >
                <option value="todo">To-do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {errors.status && (
                <p className="text-red-600 text-xs mt-1">{errors.status}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
            >
              {editTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
