<div class="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg font-sans">

  <h1 class="text-4xl font-bold mb-4 text-gray-900">Kanban Board</h1>
  <p class="text-gray-600 mb-6">
    A modern, responsive <strong>Kanban Task Manager</strong> built with <strong>React</strong> and <strong>Tailwind CSS</strong>. Tasks are organized into three statuses: <strong>To-do</strong>, <strong>In Progress</strong>, and <strong>Done</strong>. The app uses <strong>Context API</strong> + <strong>useReducer</strong> for global state and supports adding, editing, deleting, moving, filtering, sorting and searching tasks — all inside a polished dashboard UI.
  </p>

  <h2 class="text-2xl font-semibold mt-6 mb-2">Live Demo</h2>
  <p class="mb-6"><a href="https://karban-board-lws.netlify.app/" class="text-blue-600 hover:underline">https://karban-board-lws.netlify.app/</a></p>

  <hr class="my-6 border-gray-300">

  <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
  <ul class="list-disc list-inside space-y-2">
    <li><strong>Three-column board:</strong> To-do, In Progress, Done — tasks render according to their status.</li>
    <li><strong>Add / Edit Task:</strong> Modal for creating and editing tasks with pre-filled values.</li>
    <li><strong>Move tasks:</strong> Move items between columns using the menu → Move to options.</li>
    <li><strong>Delete confirmation modal:</strong> Deleting a task opens a custom modal.</li>
    <li><strong>Filter:</strong> Dropdown shows all tags used in the board.</li>
    <li><strong>Sort:</strong> Newest first / Oldest first per column.</li>
    <li><strong>Search:</strong> Filters cards by title across all columns.</li>
    <li><strong>Tag colors:</strong> Centralized in <code>tagColors.js</code>.</li>
    <li><strong>Responsive design:</strong> Works on mobile, tablet, desktop.</li>
  </ul>

  <hr class="my-6 border-gray-300">

  <h2 class="text-2xl font-semibold mb-4">Screenshots</h2>
  <div class="space-y-4">
    <div>
      <h3 class="font-semibold mb-1">Board overview</h3>
      <img src="https://i.postimg.cc/QtLzGvcy/Capture.png" alt="Board overview" class="rounded-lg shadow-md">
    </div>
    <div>
      <h3 class="font-semibold mb-1">Add Task modal</h3>
      <img src="https://i.postimg.cc/85fpxYfy/Capture.png" alt="Add Task modal" class="rounded-lg shadow-md">
    </div>
    <div>
      <h3 class="font-semibold mb-1">Delete confirmation modal</h3>
      <img src="https://i.postimg.cc/bN22dMnJ/Capture.png" alt="Delete modal" class="rounded-lg shadow-md">
    </div>
  </div>

  <hr class="my-6 border-gray-300">

  <h2 class="text-2xl font-semibold mb-4">Technologies Used</h2>
  <ul class="list-disc list-inside space-y-2">
    <li>React (functional components)</li>
    <li>Tailwind CSS (utility-first styling)</li>
    <li>State management: Context API + useReducer</li>
    <li>Build: Vite</li>
    <li>Optional: localStorage persistence</li>
  </ul>

  <hr class="my-6 border-gray-300">

  <h2 class="text-2xl font-semibold mb-4">Project Structure</h2>
  <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
/src
  /components
    /shared
       Navbar.jsx
    Sidebar.jsx
    TaskBoard.jsx
    Column.jsx
    Card.jsx
    AddTaskModal.jsx
    DeleteModal.jsx
  /svg
    CalendarIcon.jsx
    SearchIcon.jsx
  /context
    TaskContext.jsx
  /utils
    tagColors.js
    dateUtils.js
    defaultTasks.json
    tags.json
  /styles
    index.css
  App.jsx
  main.jsx
README.md
  </pre>

  <hr class="my-6 border-gray-300">

  <h2 class="text-2xl font-semibold mb-4">Validation Rules (Add/Edit Modal)</h2>
  <ul class="list-disc list-inside space-y-2">
    <li>Title: required, min 3 characters.</li>
    <li>Tag: required.</li>
    <li>Status: required.</li>
    <li>Description: optional, max 150 characters.</li>
  </ul>

</div>
