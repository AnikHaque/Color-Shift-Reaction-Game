import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../TaskContext";
import Card from "./Card";
import tags from "../utils/tags.json"; 

export default function Column({ status, title, setEditTask, openModal, searchText }) {
  const { tasks } = useContext(TaskContext);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const allTags = tags; 

  const columnTasks = (tasks || [])
    .filter(t => t.status === status)
    .filter(t => (!filterTag ? true : t.tag === filterTag))
    .filter(t =>
      !searchText ? true : t.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (!a.date) return -1;
      return sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });

  useEffect(() => {
    const handleClickOutside = () => {
      setFilterOpen(false);
      setSortOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFilterClick = (e) => {
    e.stopPropagation();
    setFilterOpen(!filterOpen);
    setSortOpen(false);
  };

  const handleSortClick = (e) => {
    e.stopPropagation();
    setSortOpen(!sortOpen);
    setFilterOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 w-full">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          {columnTasks.length}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              onClick={handleFilterClick}
            >
              Filter
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg text-sm text-gray-700 py-2 z-50">
                <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Filter by tag
                </p>

                {allTags.map(tag => (
                  <button
                    key={tag}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    onClick={() => setFilterTag(tag)}
                  >
                    {tag}
                  </button>
                ))}

                <button
                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-50"
                  onClick={() => setFilterTag("")}
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              onClick={handleSortClick}
            >
              Sort
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg text-sm text-gray-700 py-2 z-50">
                <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Sort by date
                </p>

                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  onClick={() => setSortOrder("newest")}
                >
                  Newest first
                </button>

                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  onClick={() => setSortOrder("oldest")}
                >
                  Oldest first
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-auto">
        {columnTasks.length === 0 ? (
          <p className="text-center text-gray-400">Not Found</p>
        ) : (
          columnTasks.map(task => (
            <Card
              key={task.id}
              task={task}
              setEditTask={setEditTask}
              openModal={openModal}
            />
          ))
        )}
      </div>
    </div>
  );
}
