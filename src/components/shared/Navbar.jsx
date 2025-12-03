import SearchIcon from "../../svg/SearchIcon";

export default function Navbar({ openModal, searchText, setSearchText }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase">Board Overview</p>
        <h1 className="text-2xl font-bold text-gray-900">Workspace</h1>
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative">
          <input
            type="search"
            placeholder="Search tasks"
            className="w-64 rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
         <SearchIcon></SearchIcon>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
